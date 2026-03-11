import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTextById, updateText } from "../services/text.service";

const EditText = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    content: "",
    difficulty: "medium",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const data = await getTextById(token, id);
        console.log("data", data);

        setFormData({
          content: data.result.content,
          difficulty: data.result.difficulty,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchText();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.content) {
      return setError("Content is required");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await updateText(token, id, formData);
      setSuccess("Text updated successfully");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Text</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Enter text content here..."
          value={formData.content}
          onChange={handleChange}
          rows={6}
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="quotes">Quotes</option>
          <option value="paragraph">Paragraph</option>
          <option value="code">Code</option>
          <option value="custom">Custom</option>
        </select>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Text"}
        </button>

        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditText;
