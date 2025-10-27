import axios from "axios";
import { Base_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL: Base_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept:"application/json",
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//respone interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //handle common error globally
        if(error.response){
            if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
        }  else if (error.code ==="ECONNABORTED"){
            console.error("Request timeout. please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;