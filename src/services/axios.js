import axios from "axios";

const baseURLfromenv = import.meta.env.BASE_URL 
const instance = axios.create({
  baseURL: baseURLfromenv,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
