import api from "./axios";

export const createComplaint = (data) => {
  return api.post("/complaints", data);
};

export const getMyComplaints = () => {
  return api.get("/complaints/my");
};
export const getComplaintById = (id) => {
  return api.get(`/complaints/my/${id}`);
};
export const getAllComplaints = () => {
  return api.get("/complaints");
};
