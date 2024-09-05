import axios from "axios";

export default axios.create({
    baseURL:'https://480b-2409-40d0-301d-741d-8c61-5b97-582b-a988.ngrok-free.app',
    withCredentials:true
})

