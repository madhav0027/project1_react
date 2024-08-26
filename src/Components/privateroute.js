import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authcon";


const Privateroute = () =>{
    const user = useAuth();
    if(user.token || localStorage.getItem('tokenid'))
        return <Outlet/>
    return <Navigate to="/login"/>
}

export default Privateroute;