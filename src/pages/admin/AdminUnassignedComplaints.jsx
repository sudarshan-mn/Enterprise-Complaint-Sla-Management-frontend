import { useEffect, useState } from "react";
import {
  getAllComplaints,
  assignComplaint,
  getAllUsers,
} from "../../api/admin";
import "../../styles/global.css";

export default function AdminUnassignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
    loadEngineers();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await getAllComplaints();

      const data =
        res.data?.content ||
        res.data?.data ||
        (Array.isArray(res.data) ? res.data : []);

      // ONLY NEW / UNASSIGNED
      const onlyNew = data.filter((c) => c.status === "NEW");
      setComplaints(onlyNew);
    } catch (err) {
      console.error(err);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const loadEngineers = async () => {
    try {
      const res = await getAllUsers();
      const onlyEngineers = (res.data || []).filter(
        (u) => u.role === "ENGINEER",
      );
      setEngineers(onlyEngineers);
    } catch (err) {
      console.error(err);
      alert("Failed to load engineers");
    }
  };

  const handleAssign = async (complaintId) => {
    const engineerId = selectedEngineer[complaintId];
    if (!engineerId) return alert("Select engineer");

    try {
      await assignComplaint(complaintId, engineerId);
      alert("Assigned successfully");
      loadComplaints(); // refresh
    } catch (err) {
      console.error(err);
      alert("Assign failed");
    }
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Unassigned Complaints</h1>
      </div>

      <div className="dashboard-content">
        {loading && (
          <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
        )}

        {!loading && complaints.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No unassigned complaints.
          </p>
        )}

        <div className="dashboard-cards-grid">
          {complaints.map((c) => (
            <div key={c.id} className="assign-card-modern">
              <h3>{c.title}</h3>
              <div className="card-body">
                <p>
                  <strong>ID:</strong> {c.id}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge badge-new">{c.status}</span>
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

              <select
                value={selectedEngineer[c.id] || ""}
                onChange={(e) =>
                  setSelectedEngineer({
                    ...selectedEngineer,
                    [c.id]: e.target.value,
                  })
                }
                className="engineer-select"
              >
                <option value="">Select Engineer</option>
                {engineers.map((eng) => (
                  <option key={eng.id} value={eng.id}>
                    {eng.name}
                  </option>
                ))}
              </select>

              <button
                className="btn-primary assign-btn"
                onClick={() => handleAssign(c.id)}
              >
                Assign Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
