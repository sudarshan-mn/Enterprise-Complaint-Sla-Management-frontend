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
    <div className="dashboard-container">
      <h2>My Assigned Complaints</h2>

      {loading && <p>Loading...</p>}
      {!loading && complaints.length === 0 && <p>No complaints assigned.</p>}

      <div className="dashboard-grid">
        {complaints.map((c) => (
          <div key={c.id} className="full-complaint-card">
            <h3>{c.title}</h3>

            <p>
              <strong>ID:</strong> {c.id}
            </p>
            <p>
              <strong>Description:</strong> {c.description}
            </p>
            <p>
              <strong>Status:</strong> {c.status}
            </p>
            <p>
              <strong>Priority:</strong> {c.priority}
            </p>
            <p>
              <strong>Category:</strong> {c.category}
            </p>

            {c.status === "ASSIGNED" && (
              <button onClick={() => handleStart(c.id)}>Start Work</button>
            )}

            {c.status === "IN_PROGRESS" && (
              <button onClick={() => handleResolve(c.id)}>Resolve</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
