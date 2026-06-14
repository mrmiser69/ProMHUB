import axios from "axios";

const api = axios.create({
  baseURL: "http://approval-subsection-farms-gifts.trycloudflare.com",
});

export default api;