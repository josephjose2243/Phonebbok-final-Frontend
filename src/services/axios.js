import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://phonebookfinalbackend-2.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
