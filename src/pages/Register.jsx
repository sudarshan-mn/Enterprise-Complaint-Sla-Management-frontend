import { useEffect } from "react";
import { useState } from "react";
import { registerApi } from "../api/authApi";
import "../styles/register.css";

export default function Register() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerApi({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("Registration successful. Please login.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="login-container">
      <form className="card" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p className="link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
