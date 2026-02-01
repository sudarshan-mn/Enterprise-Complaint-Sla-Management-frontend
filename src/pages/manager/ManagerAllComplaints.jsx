import { useEffect, useState } from "react";
import {
  getAllComplaints,
  closeComplaint,
  getComplaintTimeline,
} from "../../api/managerApi";
import "../../styles/global.css";

export default function ManagerAllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const res = await getAllComplaints();
    setComplaints(res.data.content || []);
  };

  const close = async (id) => {
    if (!window.confirm("Close this complaint?")) return;
    await closeComplaint(id);
    loadComplaints();
  };

  const viewTimeline = async (id) => {
    const res = await getComplaintTimeline(id);
    setTimeline(res.data || []);
    setShowTimeline(true);
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>All Complaints</h1>
      </div>

      <div className="dashboard-content">
        <div className="table-wrapper">
          <table className="styled-table" width="100%">
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
                  <td>{c.status}</td>
                  <td>{c.priority}</td>
                  <td>
                    <button onClick={() => viewTimeline(c.id)}>Timeline</button>
                    {c.status === "RESOLVED" && (
                      <button onClick={() => close(c.id)}>Close</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* TIMELINE MODAL */}
      {showTimeline && (
        <div className="modal">
          <div className="modal-content">
            <h3>Complaint Timeline</h3>

            <ul>
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

            <div className="modal-actions">
              <button onClick={() => setShowTimeline(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
