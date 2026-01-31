import { useEffect, useState } from "react";
import {
  getAllComplaints,
  closeComplaint,
  getComplaintTimeline,
} from "../../api/managerApi";

export default function ManagerAllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const res = await getAllComplaints();
    setComplaints(res.data.content);
  };

  const close = async (id) => {
    if (!window.confirm("Close this complaint?")) return;
    await closeComplaint(id);
    loadComplaints();
  };

  const viewTimeline = async (id) => {
    const res = await getComplaintTimeline(id);
    setTimeline(res.data);
    setShowTimeline(true);
  };

  return (
    <div>
      <h2>All Complaints</h2>

      <table border="1" width="100%">
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

      {/* TIMELINE MODAL */}
      {showTimeline && (
        <div style={{ border: "1px solid black", padding: 10, marginTop: 20 }}>
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

          <button onClick={() => setShowTimeline(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
