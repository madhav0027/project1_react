import axios from "axios";

export default axios.create({
    baseURL:'https://fuzzy-earwig-49.telebit.io',
    withCredentials:true
})

