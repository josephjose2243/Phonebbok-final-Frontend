import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://phonebook-backend-repo-7xzm.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
