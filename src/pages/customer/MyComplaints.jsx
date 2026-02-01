import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyComplaints } from "../../api/complaint";
import "../../styles/global.css";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await getMyComplaints();

      // SAFE EXTRACTION for Page or Array
      const data =
        res.data?.content ||
        res.data?.data ||
        (Array.isArray(res.data) ? res.data : []);

      setComplaints(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-topbar">
        <h1>My Complaints</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Your Complaints</h2>
          <p>Track and manage all your submitted complaints here</p>
        </div>

        {/* LOADING */}
        {loading && (
          <p style={{ color: "white", textAlign: "center" }}>
            Loading complaints...
          </p>
        )}

        {/* EMPTY */}
        {!loading && complaints.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No complaints found.
          </p>
        )}

        {/* LIST */}
        {!loading && (
          <div className="complaints-cards-grid">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="complaint-list-card clickable"
                onClick={() => navigate(`/customer/complaints/${c.id}`)}
              >
                <div className="card-top-section">
                  <h3>{c.title}</h3>
                  <span className="complaint-id">#{c.id}</span>
                </div>
                <div className="card-bottom-section">
                  <p className="created-date">
                    📅 {new Date(c.createdAt).toLocaleDateString()} at{" "}
                    {new Date(c.createdAt).toLocaleTimeString()}
                  </p>
                  <button className="view-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
