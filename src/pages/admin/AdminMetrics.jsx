import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/global.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load metrics");
    }
  };

  if (!metrics) return <p className="loading">Loading...</p>;

  // ===== CHART DATA =====
  const statusData = [
    { name: "New", value: metrics.newComplaints },
    { name: "Assigned", value: metrics.assignedComplaints },
    { name: "In Progress", value: metrics.inProgressComplaints },
    { name: "Resolved", value: metrics.resolvedComplaints },
    { name: "Closed", value: metrics.closedComplaints },
  ];

  const roleData = [
    { role: "Engineers", count: metrics.engineersCount },
    { role: "Leads", count: metrics.leadsCount },
    { role: "Managers", count: metrics.managersCount },
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#9333ea", "#10b981", "#ef4444"];

  return (
    <div className="dashboard-container">
      <h1>Admin Metrics</h1>

      {/* ===== METRIC CARDS ===== */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Complaints</h3>
          <p>{metrics.totalComplaints}</p>
        </div>

        <div className="dashboard-card">
          <h3>New</h3>
          <p>{metrics.newComplaints}</p>
        </div>

        <div className="dashboard-card">
          <h3>In Progress</h3>
          <p>{metrics.inProgressComplaints}</p>
        </div>

        <div className="dashboard-card">
          <h3>Resolved</h3>
          <p>{metrics.resolvedComplaints}</p>
        </div>

        <div className="dashboard-card">
          <h3>SLA Breached</h3>
          <p>{metrics.slaBreachedComplaints}</p>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-row">
        {/* PIE CHART */}
        <div className="dashboard-card chart-card">
          <h3>Complaint Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={100} label>
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="dashboard-card chart-card">
          <h3>User Roles</h3>

          <BarChart width={400} height={300} data={roleData}>
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
