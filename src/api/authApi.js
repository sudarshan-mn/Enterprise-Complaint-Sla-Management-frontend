import api from "./axios";
export const loginApi = (email, password) => {
  return api.post("api/auth/login", { email, password });
};

export const registerApi = (data) => {
  return api.post("api/auth/register", data);
};
