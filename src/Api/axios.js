import axios from "axios";
const axiosInstance = axios.create({
    // local instance firebase function
    // baseURL: "http://127.0.0.1:5002/clone-11e68/us-central1/api",
    
    // deployed version of amazon server on rendeer.com
    baseURL: "https://amazon-api-deploy-3191.onrender.com"
});

export {axiosInstance};