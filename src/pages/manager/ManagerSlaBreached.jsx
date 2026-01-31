import { useEffect, useState } from "react";
import { getSlaBreachedComplaints } from "../../api/managerApi";

export default function ManagerSlaBreached() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getSlaBreachedComplaints();
    setComplaints(res.data);
  };

  return (
    <div>
      <h2>🚨 SLA Breached Complaints</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>SLA Deadline</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>{c.priority}</td>
              <td style={{ color: "red" }}>{c.slaDeadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
