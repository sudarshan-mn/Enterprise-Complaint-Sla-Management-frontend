import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>System Management</h2>
          <p>Manage complaints, assign engineers, and monitor system metrics</p>
        </div>

        <div className="dashboard-cards-grid-admin">
          <div className="dashboard-feature-card">
            <div className="card-icon">📋</div>
            <h3>All Complaints</h3>
            <p>View all complaints in the system.</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/complaints")}
            >
              Open
            </button>
          </div>

          <div className="dashboard-feature-card highlight">
            <div className="card-icon">👥</div>
            <h3>Unassigned Complaints</h3>
            <p>Assign new complaints to engineers.</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/unassigned")}
            >
              Open
            </button>
          </div>

          <div className="dashboard-feature-card">
            <div className="card-icon">📊</div>
            <h3>Admin Metrics</h3>
            <p>Statistics and insights.</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/metrics")}
            >
              View Metrics
            </button>
          </div>
          <div
            className="dashboard-feature-card"
            onClick={() => navigate("/admin/users/create")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-icon">👤</div>
            <h3>Add System User</h3>
            <p>Create Lead, Manager, or Engineer accounts quickly.</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/users/create")}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
