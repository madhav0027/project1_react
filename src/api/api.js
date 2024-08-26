import axios from "axios";

export default axios.create({
    baseURL:'https://happy-emu-28.io',
    withCredentials:true
})

