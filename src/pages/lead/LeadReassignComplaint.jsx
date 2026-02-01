import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reassignComplaint } from "../../api/leadApi";
import "../../styles/global.css";

export default function LeadReassignComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [engineerId, setEngineerId] = useState("");

  const handleSubmit = async () => {
    await reassignComplaint(id, { engineerId });
    alert("Complaint reassigned");
    navigate("/lead/complaints");
  };

  return (
    <div className="dashboard-container">
      <div className="card form-card form-wrapper">
        <h2>Reassign Complaint</h2>

        <input
          type="number"
          placeholder="Engineer ID"
          value={engineerId}
          onChange={(e) => setEngineerId(e.target.value)}
        />

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn-primary" onClick={handleSubmit}>
            Reassign
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/lead/complaints")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
