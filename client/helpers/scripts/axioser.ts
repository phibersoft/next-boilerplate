import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? process.env.RUNNER
      : "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    phiber: process.env.PHIBER_TOKEN,
  },
});

export default instance;
