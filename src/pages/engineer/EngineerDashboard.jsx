import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function EngineerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Engineer Dashboard</h1>
      <p>Work on complaints assigned to you.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>My Complaints</h3>
          <p>View and update assigned complaints</p>
          <button onClick={() => navigate("/engineer/complaints")}>
            View Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
