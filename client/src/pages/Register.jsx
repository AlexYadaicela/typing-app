import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.services.js";


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData }, [e.target.name]: e.target.value);
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData; 
        if (!username || !email || !password) {
            return setError("All fields are required"); 
        }
        if (password != formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters")
        }

        setLoading(true);
        try {
            const data = await registerUser(username, email, password);
            localStorage.setItem('token', data.token); 
            navigate("/dashboard"); 
        } catch (error) {
            setError(err.message);
        } finally {
            setLoading(false)
        }

        return (
            <h1>Create Account</h1>
        )

    }
};

