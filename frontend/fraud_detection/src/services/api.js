import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/transactions"
});

export const explainFraud = (data) => API.post("/explain", data);