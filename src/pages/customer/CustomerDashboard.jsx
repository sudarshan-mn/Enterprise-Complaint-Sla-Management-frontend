import { useNavigate } from "react-router-dom";
import "../../styles/customerDashboard.css";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="customer-dashboard">
      {/* TOP BAR */}
      <div className="customer-topbar">
        <h2>🛠 Complaint System</h2>
        <button onClick={() => navigate("/login")} className="logout-btn">
          Logout
        </button>
      </div>

      {/* HEADER */}
      <div className="customer-header">
        <h1>Welcome 👋</h1>
        <p>Manage and track your complaints easily from one place</p>
      </div>

      {/* CARDS */}
      <div className="customer-cards">
        <div className="customer-card">
          <div className="icon">➕</div>
          <h3>Raise Complaint</h3>
          <p>Create a new complaint for any issue you are facing.</p>
          <button onClick={() => navigate("/customer/create")}>
            Create Complaint
          </button>
        </div>

        <div className="customer-card">
          <div className="icon">📄</div>
          <h3>My Complaints</h3>
          <p>View status, timeline, and updates of your complaints.</p>
          <button onClick={() => navigate("/customer/complaints")}>
            View Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
