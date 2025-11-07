import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    withCredentials: true, // send cookies for httpOnly cookie auth
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                // avoid redirect loop: don't redirect if already on login or register
                const pathname = window.location.pathname;
                if (pathname !== "/login" && pathname !== "/register") {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;