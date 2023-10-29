import api from "./api";

const resource = "/auth";

export const login = (credential) => api.post(resource, credential);

// export const logout = (token) => api.post(resource, token);

// export const register = (userDetails) => api.post(resource, userDetails);

export default api