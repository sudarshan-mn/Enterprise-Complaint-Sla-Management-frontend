import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { setAuth, getRoleFromToken } from "../auth/auth";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginApi(email, password);
      const token = response.data.token;

      // 1️⃣ Save token
      setAuth(token);

      // 2️⃣ Decode role
      const role = getRoleFromToken();
      console.log("ROLE FROM JWT:", role);

      // 3️⃣ ROLE BASED REDIRECT (COMPLETE)
      if (role === "CUSTOMER") {
        navigate("/customer");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "ENGINEER") {
        navigate("/engineer");
      } else if (role === "LEAD") {
        navigate("/lead");
      } else if (role === "MANAGER") {
        navigate("/manager");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="card" onSubmit={handleLogin}>
        <h2>Complaint System Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="link">
          New user? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
