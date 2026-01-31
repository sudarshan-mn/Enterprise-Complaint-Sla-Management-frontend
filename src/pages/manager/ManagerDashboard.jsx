import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Manager Dashboard</h2>

      <div className="card" onClick={() => navigate("/manager/complaints")}>
        <h3>📋 All Complaints</h3>
        <p>View all complaints in the system</p>
      </div>

      <div className="card" onClick={() => navigate("/manager/sla-breached")}>
        <h3>⏰ SLA Breached</h3>
        <p>View SLA breached complaints</p>
      </div>

      <div className="card" onClick={() => navigate("/manager/resolved")}>
        <h3>✅ Close Complaints</h3>
        <p>Close only RESOLVED complaints</p>
      </div>
    </div>
  );
}
