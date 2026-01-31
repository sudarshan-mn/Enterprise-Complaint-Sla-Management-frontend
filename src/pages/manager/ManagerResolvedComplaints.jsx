import { useEffect, useState } from "react";
import {
  getResolvedComplaints,
  closeComplaint,
  getComplaintTimeline,
} from "../../api/managerApi";

export default function ManagerResolvedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    loadResolved();
  }, []);

  const loadResolved = async () => {
    const res = await getResolvedComplaints();
    setComplaints(res.data);
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
    setTimeline(res.data);
    setShowTimeline(true);
  };

  return (
    <div>
      <h2>Resolved Complaints</h2>

      <table border="1" width="100%">
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

      {showTimeline && (
        <div style={{ border: "1px solid black", padding: 10 }}>
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
          <button onClick={() => setShowTimeline(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
