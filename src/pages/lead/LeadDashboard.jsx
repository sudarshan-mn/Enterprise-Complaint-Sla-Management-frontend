import { useNavigate } from "react-router-dom";

export default function LeadDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Lead Dashboard</h2>

      <div className="card" onClick={() => navigate("/lead/complaints")}>
        <h3>Monitor Complaints</h3>
        <p>Reassign, escalate, view timelines</p>
      </div>
    </div>
  );
}
