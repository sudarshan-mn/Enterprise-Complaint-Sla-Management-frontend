import { useState } from "react";
import axios from "axios";
import { getToken } from "../../auth/auth";
import "../../styles/global.css";
import api from "../../api/axios";

export default function AdminAddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.role) {
      alert("Please select a role");
      return;
    }

    try {
      await api.post("/users", form);
      alert("User created successfully");
      setForm({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      alert("Failed to create user");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 72 }}>
      <div
        className="card dashboard-card"
        style={{ maxWidth: 780, margin: "0 auto", padding: 28 }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, color: "#1f2937" }}>Create System User</h2>
            <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
              Create Lead, Manager, or Engineer accounts
            </p>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(180deg,#6d28d9,#4c1d95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 10px 30px rgba(76,29,149,0.12)",
            }}
          >
            <span style={{ fontSize: 20 }}>👤</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ display: "grid", gap: 14 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 13, color: "#374151", fontWeight: 700 }}>
              Full name
            </label>
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e6eefc",
                boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
                background: "#fff",
                color: "#111827",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 13, color: "#374151", fontWeight: 700 }}>
              Email address
            </label>
            <input
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e6eefc",
                background: "#fff",
                color: "#111827",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 13, color: "#374151", fontWeight: 700 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #e6eefc",
                background: "#fff",
                color: "#111827",
              }}
            />
            <small style={{ color: "#9ca3af" }}>
              Minimum 8 characters recommended
            </small>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 13, color: "#374151", fontWeight: 700 }}>
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #e6eefc",
                background: "#fff",
                color: "#111827",
              }}
            >
              <option value="">Select Role</option>
              <option value="LEAD">LEAD</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ENGINEER">ENGINEER</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(90deg,#667eea,#5568d3)",
                color: "white",
                fontWeight: 700,
                boxShadow: "0 10px 30px rgba(86,100,215,0.18)",
                cursor: "pointer",
              }}
            >
              Create User
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({ name: "", email: "", password: "", role: "" })
              }
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: 10,
                border: "1px solid #e6eefc",
                background: "#fff",
                color: "#374151",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
