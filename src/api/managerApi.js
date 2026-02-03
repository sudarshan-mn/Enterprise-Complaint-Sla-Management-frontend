import { getToken } from "../auth/auth";

import api from "./axios";

/* ✅ MANAGER APIs ONLY */

// SLA breached complaints
export const getSlaBreachedComplaints = () =>
  api.get("/api/manager/sla-breached");

// Resolved complaints (only these can be closed)
export const getResolvedComplaints = () => api.get("/api/manager/resolved");

// Close complaint
export const closeComplaint = (id) =>
  api.put(`/api/manager/complaints/${id}/close`);

// Timeline (shared endpoint)
export const getComplaintTimeline = (id) =>
  api.get(`/api/complaints/${id}/timeline`);

export const getAllComplaints = () => api.get("/api/complaints/all");
