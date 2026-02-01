import { useEffect, useState } from "react";
import {
  getAllComplaints,
  getTimeline,
  getEngineers,
  reassignComplaint,
  escalateComplaint,
} from "../../api/leadApi";

import "./lead.css";

export default function LeadComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  const [engineers, setEngineers] = useState([]);
  const [showReassign, setShowReassign] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const res = await getAllComplaints();
    setComplaints(res.data.content); // Page<>
  };

  /* ---------- TIMELINE ---------- */
  const viewTimeline = async (id) => {
    const res = await getTimeline(id);
    setTimeline(res.data);
    setShowTimeline(true);
  };

  /* ---------- REASSIGN ---------- */
  const openReassign = async (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedEngineer("");
    const res = await getEngineers();
    setEngineers(res.data);
    setShowReassign(true);
  };

  const confirmReassign = async () => {
    if (!selectedEngineer) {
      alert("Please select an engineer");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reassign this complaint?",
    );
    if (!confirmed) return;

    await reassignComplaint(selectedComplaint.id, {
      engineerId: selectedEngineer,
    });

    alert("Complaint reassigned successfully");
    setShowReassign(false);
    loadComplaints();
  };

  /* ---------- ESCALATE ---------- */
  const escalate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to escalate this complaint?\n\nPriority will be increased.",
    );
    if (!confirmed) return;

    await escalateComplaint(id);
    alert("Complaint escalated");
    loadComplaints();
  };

  const badgeClass = (status) => `badge ${status.toLowerCase()}`;

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>📊 Complaints Monitoring</h1>
      </div>

      <div className="dashboard-content">
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>
                    <span className={badgeClass(c.status)}>{c.status}</span>
                  </td>
                  <td>{c.priority}</td>
                  <td className="actions">
                    {/* Timeline → ALWAYS */}
                    <button onClick={() => viewTimeline(c.id)}>
                      📜 Timeline
                    </button>

                    {/* Reassign → NOT for NEW / RESOLVED / CLOSED */}
                    {c.status !== "NEW" &&
                      c.status !== "RESOLVED" &&
                      c.status !== "CLOSED" && (
                        <button onClick={() => openReassign(c)}>
                          👤 Reassign
                        </button>
                      )}

                    {/* Escalate → NOT for RESOLVED / CLOSED */}
                    {c.status !== "RESOLVED" && c.status !== "CLOSED" && (
                      <button className="danger" onClick={() => escalate(c.id)}>
                        ⚠️ Escalate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ---------- TIMELINE MODAL ---------- */}
          {showTimeline && (
            <div className="modal">
              <div className="modal-content">
                <h3>Complaint Timeline</h3>

                {timeline.length === 0 ? (
                  <p>No history available</p>
                ) : (
                  <ul className="timeline">
                    {timeline.map((t, i) => (
                      <li key={i}>
                        <b>{t.oldStatus}</b> ➜ <b>{t.newStatus}</b>
                        <br />
                        <small>
                          {t.changedByName} ({t.changedByRole})
                        </small>
                      </li>
                    ))}
                  </ul>
                )}

                <button onClick={() => setShowTimeline(false)}>Close</button>
              </div>
            </div>
          )}

          {/* ---------- REASSIGN MODAL ---------- */}
          {showReassign && (
            <div className="modal">
              <div className="modal-content">
                <h3>Reassign Complaint</h3>

                <select
                  value={selectedEngineer}
                  onChange={(e) => setSelectedEngineer(e.target.value)}
                >
                  <option value="">Select Engineer</option>
                  {engineers.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>

                <div className="modal-actions">
                  <button onClick={confirmReassign}>Confirm</button>
                  <button onClick={() => setShowReassign(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
