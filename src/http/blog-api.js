import api from "./api";

const resource = "/blogs";

export const allBlogs = () => api.get(resource);

export const createBlog = (blog) => api.post(resource, blog);

export const updateBlog = (id, blog) => api.put(`${resource}/${id}`, blog);

export const removeBlog = (id) => api.delete(`${resource}/${id}`);

export const completeBlog = (id, blog) => api.put(`${resource}/${id}/complete`, blog);
