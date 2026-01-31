import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reassignComplaint } from "../../api/leadApi";

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
    <div>
      <h2>Reassign Complaint</h2>

      <input
        type="number"
        placeholder="Engineer ID"
        value={engineerId}
        onChange={(e) => setEngineerId(e.target.value)}
      />

      <button onClick={handleSubmit}>Reassign</button>
    </div>
  );
}
