import axios from "axios";

const api = axios.create({
  baseURL: "https://promohub.duckdns.org",
});

export default api;