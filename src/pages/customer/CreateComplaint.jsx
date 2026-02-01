import { useState } from "react";
import { createComplaint } from "../../api/complaint";
import "../../styles/global.css";

export default function CreateComplaint() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "LOW",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createComplaint(form);
      setMessage("Complaint created successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        priority: "LOW",
      });
    } catch {
      setMessage("Failed to create complaint");
    }
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Raise Complaint</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Submit Your Complaint</h2>
          <p>Tell us about your issue and we'll resolve it quickly</p>
        </div>

        <div className="form-container">
          <div className="form-card-modern">
            {message && (
              <div
                className={`message ${message.includes("successfully") ? "success" : "error"}`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Complaint Title</label>
                <input
                  name="title"
                  placeholder="e.g., Payment issue with order"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your issue in detail..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="form-input"
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Category</option>
                    <option value="PAYMENT">💳 Payment</option>
                    <option value="LOGIN">🔐 Login</option>
                    <option value="DELIVERY">🚚 Delivery</option>
                    <option value="SECURITY">🛡️ Security</option>
                    <option value="OTHER">📝 Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="LOW">🟢 Low</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="HIGH">🔴 High</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary btn-large">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
