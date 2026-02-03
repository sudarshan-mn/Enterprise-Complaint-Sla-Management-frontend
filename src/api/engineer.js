import api from "./axios";

// Get complaints assigned to logged-in engineer
export const getAssignedComplaints = () => {
  return api.get("/api/complaints/assigned");
};

// Start complaint
export const startComplaint = (id) => {
  return api.put(`/api/complaints/${id}/start`);
};

// Resolve complaint
export const resolveComplaint = (id) => {
  return api.put(`/api/complaints/${id}/resolve`);
};
