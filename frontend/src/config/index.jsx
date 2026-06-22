import axios from "axios";

export const clientServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);
