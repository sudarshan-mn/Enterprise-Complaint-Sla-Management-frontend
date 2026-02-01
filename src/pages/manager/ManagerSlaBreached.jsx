import { useEffect, useState } from "react";
import { getSlaBreachedComplaints } from "../../api/managerApi";
import "../../styles/global.css";

export default function ManagerSlaBreached() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getSlaBreachedComplaints();
    setComplaints(res.data || []);
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>🚨 SLA Breached Complaints</h1>
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
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>
                    <span className={`badge badge-${c.status?.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`priority-badge priority-${c.priority?.toLowerCase()}`}
                    >
                      {c.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
