import axios from "axios";
import config from "../../config";
export default axios.create({
  baseURL: config.API_URL,
  headers: {
    // Accept: "application/json",
    // "Content-type": "application/json",
    // Authorization: "Token b10462d9e5879b4a6a9137310bcdf212dcf257a3",
  },
});
