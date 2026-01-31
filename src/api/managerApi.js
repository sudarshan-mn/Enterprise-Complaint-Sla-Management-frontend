import axios from "axios";
import { getToken } from "../auth/auth";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ✅ MANAGER APIs ONLY */

// SLA breached complaints
export const getSlaBreachedComplaints = () =>
  API.get("/api/manager/sla-breached");

// Resolved complaints (only these can be closed)
export const getResolvedComplaints = () => API.get("/api/manager/resolved");

// Close complaint
export const closeComplaint = (id) =>
  API.put(`/api/manager/complaints/${id}/close`);

// Timeline (shared endpoint)
export const getComplaintTimeline = (id) =>
  API.get(`/api/complaints/${id}/timeline`);

export const getAllComplaints = () => API.get("/api/complaints/all");
