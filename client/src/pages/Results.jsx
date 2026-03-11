import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserResults } from "../services/result.service.js";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserResults(token);
        setResults(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* header */}
      <div>
        <h1>My Results</h1>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      {error && <p>{error}</p>}

      {results.length === 0 ? (
        <p>No results yet. Take a typing test to get started.</p>
      ) : (
        results.map((result) => (
          <div key={result._id}>
            {/* stats */}
            <div>
              <p>WPM: {result.wpm}</p>
              <p>Accuracy: {result.accuracy}%</p>
              <p>Errors: {result.errorCount}</p>
              <p>Duration: {result.duration}s</p>
              <p>Status: {result.completed ? "Completed" : "Incomplete"}</p>
            </div>

            {/* text info */}
            {result.textId && (
              <div>
                <p>Difficulty: {result.textId.difficulty}</p>
                <p>Category: {result.textId.category}</p>
                <p>Words: {result.textId.wordCount}</p>
              </div>
            )}

            {/* date */}
            <p>{new Date(result.createdAt).toLocaleDateString()}</p>

            {/* actions */}
            <div>
              <button onClick={() => navigate(`/test/${result.textId?._id}`)}>
                Retry
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
