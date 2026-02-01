import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function LeadDashboard() {
  const navigate = useNavigate();

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Lead Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Manage Complaints Efficiently</h2>
          <p>Monitor, reassign, and escalate complaints with ease</p>
        </div>

        <div className="dashboard-cards-grid">
          <div
            className="dashboard-feature-card clickable"
            onClick={() => navigate("/lead/complaints")}
          >
            <div className="card-icon">📊</div>
            <h3>Monitor Complaints</h3>
            <p>Reassign, escalate, view timelines</p>
            <button className="btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
