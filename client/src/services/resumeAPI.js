import API from "../api/axios"

export const deleteResume = (id) => {
  return API.delete(`/resume/${id}`);
};