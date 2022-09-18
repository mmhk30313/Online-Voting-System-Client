import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
    access_token: localStorage.getItem("access_token"),
});

export default axiosInstance;
