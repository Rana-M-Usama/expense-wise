import axios from "axios";

const baseURL = process.env.REACT_APP_API_URI;

const AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default AxiosInstance;
