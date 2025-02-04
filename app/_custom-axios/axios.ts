import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
