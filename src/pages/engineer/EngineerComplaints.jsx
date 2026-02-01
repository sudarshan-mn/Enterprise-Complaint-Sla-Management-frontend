import { useEffect, useState } from "react";
import {
  getAssignedComplaints,
  startComplaint,
  resolveComplaint,
} from "../../api/engineer";
import "../../styles/global.css";

export default function EngineerComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await getAssignedComplaints();
      const data =
        res.data?.content ||
        res.data?.data ||
        (Array.isArray(res.data) ? res.data : []);
      setComplaints(data);
    } catch {
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (id) => {
    await startComplaint(id);
    loadComplaints();
  };

  const handleResolve = async (id) => {
    await resolveComplaint(id);
    loadComplaints();
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>My Assigned Complaints</h1>
      </div>

      <div className="dashboard-content">
        {loading && (
          <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
        )}
        {!loading && complaints.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No complaints assigned.
          </p>
        )}

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
                  <strong>Description:</strong> {c.description}
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
              </div>
              <div className="complaint-actions">
                {c.status === "ASSIGNED" && (
                  <button
                    className="btn-primary"
                    onClick={() => handleStart(c.id)}
                  >
                    Start Work
                  </button>
                )}
                {c.status === "IN_PROGRESS" && (
                  <button
                    className="btn-success"
                    onClick={() => handleResolve(c.id)}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
