import api from "./axios";

export const getAllComplaints = (page = 0, size = 10) => {
  return api.get(`/api/complaints/all?page=${page}&size=${size}`);
};
export const assignComplaint = (complaintId, engineerId) => {
  return api.put(`/api/complaints/${complaintId}/assign`, {
    engineerId,
  });
};
export const getAllUsers = () => {
  return api.get("/api/users");
};
export const getAdminMetrics = () => {
  return api.get("/api/admin/dashboard");
};
export const createUser = (data) => {
  return api.post("/api/users", data);
};
