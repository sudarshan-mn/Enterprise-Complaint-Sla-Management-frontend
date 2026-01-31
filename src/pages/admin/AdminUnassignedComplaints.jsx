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
    <div className="dashboard-container">
      <h2>Unassigned Complaints</h2>

      {loading && <p>Loading...</p>}

      {!loading && complaints.length === 0 && <p>No unassigned complaints.</p>}

      <div className="dashboard-grid">
        {complaints.map((c) => (
          <div key={c.id} className="assign-card">
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

            {/* ENGINEER DROPDOWN */}
            <select
              value={selectedEngineer[c.id] || ""}
              onChange={(e) =>
                setSelectedEngineer({
                  ...selectedEngineer,
                  [c.id]: e.target.value,
                })
              }
            >
              <option value="">Select Engineer</option>
              {engineers.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.name}
                </option>
              ))}
            </select>

            <button onClick={() => handleAssign(c.id)}>Assign</button>
          </div>
        ))}
      </div>
    </div>
  );
}
