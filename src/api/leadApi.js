import { getToken } from "../auth/auth";
import api from "./axios";

/* ================= LEAD APIs ================= */

// LEAD can see all complaints (ADMIN API reused)
export const getAllComplaints = () => api.get("/complaints/all");

// Timeline
export const getTimeline = (id) => api.get(`/complaints/${id}/timeline`);

// Get engineers (ADMIN-only API reused by LEAD)
export const getEngineers = () => api.get("/users/engineers");

// Reassign complaint
export const reassignComplaint = (id, data) =>
  api.put(`/complaints/${id}/reassign`, data);

// Escalate complaint
export const escalateComplaint = (id) => api.put(`/complaints/${id}/escalate`);
