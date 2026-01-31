import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        {/* ALL COMPLAINTS */}
        <div className="dashboard-card">
          <h3>All Complaints</h3>
          <p>View all complaints in the system.</p>
          <button onClick={() => navigate("/admin/complaints")}>Open</button>
        </div>

        {/* UNASSIGNED */}
        <div className="dashboard-card highlight-card">
          <h3>Unassigned Complaints</h3>
          <p>Assign new complaints to engineers.</p>
          <button onClick={() => navigate("/admin/unassigned")}>Open</button>
        </div>

        {/* METRICS */}
        <div className="dashboard-card">
          <h3>Admin Metrics</h3>
          <p>Statistics and insights.</p>
          <button onClick={() => navigate("/admin/metrics")}>
            View Metrics
          </button>
        </div>
      </div>
    </div>
  );
}
