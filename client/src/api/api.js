import axios from "axios";
const local = import.meta.env.VITE_SERVER_URL || ""; // Fallback for production
const api = axios.create({
  baseURL: `${local}/api`,
  withCredentials: true,
});
export default api;
