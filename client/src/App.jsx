import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditText from "./pages/EditText.jsx";
import TypingTest from "./pages/TypingTest.jsx";
import Results from "./pages/Results.jsx";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="register">Register</Link>
        <Link to="login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/texts/edit/:id" element={<EditText />} />
        <Route path="/test/:id" element={<TypingTest />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
