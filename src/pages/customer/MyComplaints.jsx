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
    <div className="dashboard-container">
      <h2>My Complaints</h2>

      {/* LOADING */}
      {loading && <p>Loading complaints...</p>}

      {/* EMPTY */}
      {!loading && complaints.length === 0 && <p>No complaints found.</p>}

      {/* LIST */}
      {!loading &&
        complaints.map((c) => (
          <div
            key={c.id}
            className="dashboard-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/customer/complaints/${c.id}`)}
          >
            <h3>{c.title}</h3>
            <p>
              <strong>ID:</strong> {c.id}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}
