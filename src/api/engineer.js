import api from "./axios";

// Get complaints assigned to logged-in engineer
export const getAssignedComplaints = () => {
  return api.get("/complaints/assigned");
};

// Start complaint
export const startComplaint = (id) => {
  return api.put(`/complaints/${id}/start`);
};

// Resolve complaint
export const resolveComplaint = (id) => {
  return api.put(`/complaints/${id}/resolve`);
};
