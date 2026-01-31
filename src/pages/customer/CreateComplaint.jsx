import { useState } from "react";
import { createComplaint } from "../../api/complaint";

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
    <div className="card" style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Raise Complaint</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="PAYMENT">Payment</option>
          <option value="LOGIN">Login</option>
          <option value="DELIVERY">Delivery</option>
          <option value="SECURITY">Security</option>
          <option value="OTHER">Other</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}
