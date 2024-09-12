import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import api from "../api/api";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [token,settoken] = useState(localStorage.getItem("sessionid")|| "");
    const [error,Seterror] = useState('');
    const [isauthenticated,setisauthenticated] = useState(false)

    
    const navigate = useNavigate();
    
    const loginaction = async (email,password) => {
        try {
            let response = await axios.post('/auth/api/login',{email,password},{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
            if(response.status === 440)
                {
                    logout();
                    navigate('/login');
            
                }else { //if(response.data)
                console.log(response)
                let data = response.data;
                settoken(data.sessionid);
                localStorage.setItem("sessionid",data.sessionid);
                if(token)
                    setisauthenticated(true)
                navigate('/dashboard')
                window.location.reload()
                return;
             }
        } catch (error) {
            if(error.response){
                Seterror(error.response.data.error.message)
                setTimeout(() =>{
                    Seterror('')
                },2000)
            }
            else if(error.request)
                Seterror('Internal Server Error')
            else
            Seterror(error)
    }
}
const logout = () => {
        settoken("")
        localStorage.clear();
        localStorage.removeItem('sessionid');
        setisauthenticated(false)
        axios.post('/auth/api/logout')
            .then((res) => {
                if(res.data)
                    navigate("/login");
                    window.location.reload()
            });
        return;
    }

    return (
        <AuthContext.Provider value={{token,loginaction,logout,isauthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () =>{
    return useContext(AuthContext);
}
