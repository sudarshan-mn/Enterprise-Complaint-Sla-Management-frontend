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
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>All Complaints</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-cards-grid-wide">
          {complaints.map((c) => (
            <div key={c.id} className="full-complaint-card">
              <div className="complaint-header">
                <h3>{c.title}</h3>
                <span className={`badge badge-${c.status?.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>
              <div className="complaint-body">
                <p>
                  <strong>ID:</strong> {c.id}
                </p>
                <p>
                  <strong>Priority:</strong>{" "}
                  <span
                    className={`priority-badge priority-${c.priority?.toLowerCase()}`}
                  >
                    {c.priority}
                  </span>
                </p>
                <p>
                  <strong>Category:</strong> {c.category}
                </p>
                <p>
                  <strong>Assigned To:</strong>{" "}
                  {c.assignedToName || "Not Assigned"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
