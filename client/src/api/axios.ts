import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create();
API.defaults.baseURL = `http://localhost:4000/api/`;
API.defaults.headers.common.accept = "application/json";
API.defaults.headers["Access-Control-Allow-Origin"] = "*";
API.defaults.headers["Access-Control-Allow-Headers"] = "*";
API.defaults.headers["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE, OPTIONS";

// API.defaults.withCredentials = true;

// const baseURL =
//   process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "";

// const API = axios.create({
//   baseURL,
//   headers: {
//     Accept: "application/json",
//     "Content-type": "application/json",
//   },
// });
export default API;
