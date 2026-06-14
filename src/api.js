import axios from "axios";

const api = axios.create({
  baseURL: "https://approval-subsection-farms-gifts.trycloudflare.com",
});

export default api;