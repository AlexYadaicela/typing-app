import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/auth.service.js";
import { getAllTexts, deleteText } from "../services/text.service.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    const fetchTexts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const data = await getAllTexts(token);
        setTexts(data.texts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this text?",
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await deleteText(token, id);

      setTexts((prev) => prev.filter((text) => text._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStartTest = (id) => {
    navigate(`/test/${id}`);
  };

  return (
    <div>
      {/* header */}
      <div>
        <h1>Welcome, {user?.username}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p>{error}</p>}

      {/* actions */}
      <div>
        <button onClick={() => navigate("/texts/create")}>Add New Text</button>
        <button onClick={() => navigate("/results")}>View My Results</button>
      </div>

      {/* texts list */}
      <div>
        <h2>My Texts</h2>

        {texts.length === 0 ? (
          <p>No texts yet. Add one to get started.</p>
        ) : (
          texts.map((text) => (
            <div key={text._id}>
              <p>{text.content}</p>

              <div>
                <span>{text.difficulty}</span>
                <span>{text.category}</span>
                <span>{text.wordCount} words</span>
                <span>{text.isActive ? "Active" : "Inactive"}</span>
              </div>

              <div>
                <button onClick={() => handleStartTest(text._id)}>
                  Start Test
                </button>
                <button onClick={() => navigate(`/texts/edit/${text._id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(text._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
