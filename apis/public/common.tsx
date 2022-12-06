import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/music/api/",
  headers: {
    // Accept: "application/json",
    // "Content-type": "application/json",
    // Authorization: "Token b10462d9e5879b4a6a9137310bcdf212dcf257a3",
  },
});
