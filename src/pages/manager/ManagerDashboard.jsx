import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Manager Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Manage Your Team</h2>
          <p>
            Monitor complaints, track SLA compliance, and close resolved issues
          </p>
        </div>

        <div className="dashboard-cards-grid">
          <div
            className="dashboard-feature-card"
            onClick={() => navigate("/manager/complaints")}
          >
            <div className="card-icon">📋</div>
            <h3>All Complaints</h3>
            <p>View all complaints in the system</p>
            <button className="btn-primary">View</button>
          </div>

          <div
            className="dashboard-feature-card"
            onClick={() => navigate("/manager/sla-breached")}
          >
            <div className="card-icon">🚨</div>
            <h3>SLA Breached</h3>
            <p>View SLA breached complaints</p>
            <button className="btn-primary">View</button>
          </div>

          <div
            className="dashboard-feature-card"
            onClick={() => navigate("/manager/resolved")}
          >
            <div className="card-icon">✅</div>
            <h3>Close Complaints</h3>
            <p>Close only RESOLVED complaints</p>
            <button className="btn-primary">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}
