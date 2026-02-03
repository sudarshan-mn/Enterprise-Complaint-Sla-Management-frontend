import api from "./axios";

export const createComplaint = (data) => {
  return api.post("/api/complaints", data);
};

export const getMyComplaints = () => {
  return api.get("/api/complaints/my");
};
export const getComplaintById = (id) => {
  return api.get(`/api/complaints/my/${id}`);
};
export const getAllComplaints = () => {
  return api.get("/api/complaints");
};
