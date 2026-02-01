import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function EngineerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Engineer Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Your Work Awaits</h2>
          <p>Work on complaints assigned to you and resolve them efficiently</p>
        </div>

        <div className="dashboard-cards-grid">
          <div className="dashboard-feature-card">
            <div className="card-icon">⚙️</div>
            <h3>My Complaints</h3>
            <p>View and update assigned complaints</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/engineer/complaints")}
            >
              View Complaints
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
