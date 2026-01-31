import api from "./axios";

export const getAllComplaints = (page = 0, size = 10) => {
  return api.get(`/complaints/all?page=${page}&size=${size}`);
};
export const assignComplaint = (complaintId, engineerId) => {
  return api.put(`/complaints/${complaintId}/assign`, {
    engineerId,
  });
};
export const getAllUsers = () => {
  return api.get("/users");
};
export const getAdminMetrics = () => {
  return api.get("/admin/dashboard");
};
