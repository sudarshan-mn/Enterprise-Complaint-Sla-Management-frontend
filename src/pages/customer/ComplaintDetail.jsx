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

  if (!complaint)
    return (
      <div className="modern-dashboard">
        <div className="dashboard-content">
          <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>Complaint Details</h1>
      </div>

      <div className="dashboard-content">
        <div className="detail-card-wrapper">
          <div className="detail-card">
            <div className="detail-header">
              <h2>{complaint.title}</h2>
              <span
                className={`status-badge status-${complaint.status?.toLowerCase()}`}
              >
                {complaint.status}
              </span>
            </div>

            <div className="detail-body">
              <div className="detail-section">
                <h3>Complaint Information</h3>
                <div className="detail-row">
                  <span className="label">Complaint ID:</span>
                  <span className="value">{complaint.id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Category:</span>
                  <span className="value badge-info">{complaint.category}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Priority:</span>
                  <span
                    className={`value priority-badge priority-${complaint.priority?.toLowerCase()}`}
                  >
                    {complaint.priority}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Description</h3>
                <p className="description-text">{complaint.description}</p>
              </div>

              <div className="detail-section">
                <h3>Timeline</h3>
                <div className="timeline-item">
                  <span className="timeline-label">Submitted:</span>
                  <span className="timeline-date">
                    {new Date(complaint.createdAt).toLocaleDateString()} at{" "}
                    {new Date(complaint.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
