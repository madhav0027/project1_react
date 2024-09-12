import axios from "axios";

export default axios.create({
    baseURL:'https://smashing-phoenix-openly.ngrok-free.app',
    // baseURL:'http://localhost:5000',
    withCredentials:true
})