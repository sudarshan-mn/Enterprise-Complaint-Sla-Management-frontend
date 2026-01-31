import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../../api/complaint";
import "../../styles/global.css";

export default function ComplaintDetail() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getComplaintById(id);
    setComplaint(res.data);
  };

  if (!complaint) return <p style={{ padding: "30px" }}>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2>Complaint Detail</h2>

      <div className="dashboard-card">
        <p>
          <strong>ID:</strong> {complaint.id}
        </p>
        <p>
          <strong>Title:</strong> {complaint.title}
        </p>
        <p>
          <strong>Description:</strong> {complaint.description}
        </p>
        <p>
          <strong>Status:</strong> {complaint.status}
        </p>
        <p>
          <strong>Priority:</strong> {complaint.priority}
        </p>
        <p>
          <strong>Category:</strong> {complaint.category}
        </p>
        <p>
          <strong>Created At:</strong> {complaint.createdAt}
        </p>
      </div>
    </div>
  );
}
