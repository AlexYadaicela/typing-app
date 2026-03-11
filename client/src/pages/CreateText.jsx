import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createText } from "../services/text.service.js";

const CreateText = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
    difficulty: "medium",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
      await createText(token, formData);
      setSuccess("Text create successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Text</h1>

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
          {loading ? "Creating..." : "Create Text"}
        </button>

        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateText;
