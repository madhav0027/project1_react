import { createContext, useContext, useEffect, useState } from 'react';
import '../styles/login.css'
import { useAuth } from '../Components/Authcon';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login () {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,Seterror] = useState('');
    const [token,settoken] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const validateEmail = (email) =>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(email)
        console.log(password)
        
        //validate email
        if(!validateEmail(email))
            Seterror('Email is not Correct!!')
        else{
            auth.loginaction(email,password)
            return;
        }
    }


    useEffect(() => {
        if(auth.token && auth.token !== 'undefined' 
        || localStorage.getItem('tokenid') && localStorage.getItem('tokenid') !== 'undefined'){
            navigate('/dashboard');
        }

    })

    return(
        <div className='main-container-login'>
            <div className="login-container">
        <h2>Login</h2>
        <p style={{color:'red'}}>{error}</p>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button id='login' type="submit">Login</button>
        </form>
        <br/>
        <span>
            <GoogleLogin width={'260px'}
                onSuccess={async (CredentialResponse) => {
                    auth.token = CredentialResponse.credential;
                    let tokenid = auth.token
                    localStorage.setItem('tokenid',tokenid);
                    await api.get('/auth/api/google',{
                        headers:{
                            'Authorization':`bearer ${tokenid}`,
                            'Content-Type':'application/json'
                        }
                    }
                ).then((res) => {
                    if(res.data){
                        settoken(res.data.sessonid)
                        localStorage.setItem("sessionid",res.data.sessionid);                              
                        navigate('/');
                        window.location.reload()
                        return;}
                    })
                }}
                onError={(err) => {
                    Seterror(err)
                }}
                />
        </span>
        </div>
    </div>        
    );
}

