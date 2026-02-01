import { useEffect, useState } from "react";
import {
  getResolvedComplaints,
  closeComplaint,
  getComplaintTimeline,
} from "../../api/managerApi";
import "../../styles/global.css";

export default function ManagerResolvedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    loadResolved();
  }, []);

  const loadResolved = async () => {
    const res = await getResolvedComplaints();
    setComplaints(res.data || []);
  };

  const close = async (id) => {
    if (!window.confirm("Are you sure you want to CLOSE this complaint?"))
      return;

    await closeComplaint(id);
    alert("Complaint closed successfully");
    loadResolved();
  };

  const viewTimeline = async (id) => {
    const res = await getComplaintTimeline(id);
    setTimeline(res.data || []);
    setShowTimeline(true);
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Resolved Complaints</h1>
      </div>

      <div className="dashboard-content">
        <div className="table-wrapper">
          <table className="styled-table" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.status}</td>
                  <td>
                    <button onClick={() => viewTimeline(c.id)}>Timeline</button>
                    <button onClick={() => close(c.id)}>Close</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showTimeline && (
        <div className="modal">
          <div className="modal-content">
            <h3>Timeline</h3>
            <ul>
              {timeline.map((t, i) => (
                <li key={i}>
                  {t.oldStatus} ➜ {t.newStatus} <br />
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
