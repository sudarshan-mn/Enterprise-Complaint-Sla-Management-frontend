import { useEffect, useState } from "react";
import { getAllComplaints } from "../../api/admin";
import "../../styles/global.css";

export default function AdminAllComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllComplaints();
    const data =
      res.data?.content ||
      res.data?.data ||
      (Array.isArray(res.data) ? res.data : []);
    setComplaints(data);
  };

  return (
    <div className="dashboard-container">
      <h2>All Complaints</h2>

      <div className="dashboard-grid">
        {complaints.map((c) => (
          <div key={c.id} className="full-complaint-card">
            <h3>{c.title}</h3>
            <p>ID: {c.id}</p>
            <p>Description: {c.description}</p>
            <p>Status: {c.status}</p>
            <p>Priority: {c.priority}</p>
            <p>Category: {c.category}</p>
            <p>Assigned To: {c.assignedToName || "Not Assigned"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
