import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authcon";


const Privateroute = () =>{
    if(localStorage.getItem('sessionid') || localStorage.getItem('tokenid'))
        return <Outlet/>
    return <Navigate to="/login"/>
}

export default Privateroute;