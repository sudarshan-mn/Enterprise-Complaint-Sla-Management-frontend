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

/* ================= LEAD APIs ================= */

// LEAD can see all complaints (ADMIN API reused)
export const getAllComplaints = () => API.get("/api/complaints/all");

// Timeline
export const getTimeline = (id) => API.get(`/api/complaints/${id}/timeline`);

// Get engineers (ADMIN-only API reused by LEAD)
export const getEngineers = () => API.get("/api/users/engineers");

// Reassign complaint
export const reassignComplaint = (id, data) =>
  API.put(`/api/complaints/${id}/reassign`, data);

// Escalate complaint
export const escalateComplaint = (id) =>
  API.put(`/api/complaints/${id}/escalate`);
