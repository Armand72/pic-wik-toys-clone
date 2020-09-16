import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create();
API.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL_ADDRESS
    : process.env.REACT_APP_SERVER_ADDRESS;
API.defaults.headers.common.accept = "application/json";
API.defaults.headers["Access-Control-Allow-Origin"] = "*";
API.defaults.headers["Access-Control-Allow-Headers"] = "*";
API.defaults.headers["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE, OPTIONS";

export default API;
