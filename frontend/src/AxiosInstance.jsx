import axios from "axios";

const BaseUrl = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL : BaseUrl,
    timeout : 10000,
    withCredentials:true
})

export default axiosInstance
export {BaseUrl}
