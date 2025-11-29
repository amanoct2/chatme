import axios from "axios";

const url = "http://localhost:4000";

export const axiosInstance = axios.create({
    baseURL: url,
});

export const urlEndpoint = url;
