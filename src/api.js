import axios from "axios";

const api = axios.create({
  baseURL: "http://15.134.135.202:3000",
});

export default api;