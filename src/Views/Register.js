import { useEffect, useState } from "react";
import '../styles/register.css'
import api from "../api/api";
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../Components/Authcon";

export default function Register(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender,setgender] = useState('');
    const [Error,SetError] = useState('')
    const [registerdone,setregisterdone] = useState(false)
    const auth = useAuth;
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email)
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic here        
        if(!validateEmail(email)){
            SetError('Please Check your ,Email')
        }

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('gender',gender)
        if(gender === "")
            SetError("Please Fill Gender Please")

        try {
            let response = await api.post('/auth/api/signin',{
                username,password,email,gender
            })

            console.log(response)
            if(response.data)
                {
                    setregisterdone(true)            
                }
        } catch (error) {
            if(error.response)
                SetError(error.response.data.error.message)
            else if(error.request)
                SetError('No response recived from server')
            else {
                SetError("Error in Setting up request")
            }
        }

    };
    
    useEffect(() => {
        if(auth.token && auth.token !== 'undefined' 
        || localStorage.getItem('tokenid') && localStorage.getItem('tokenid') !== 'undefined'){
            navigate('/dashboard');
        }

    })

    return (        
        <div className="register-main-container">
        {
            registerdone ? 
            <div className="">
                <h1>
                    Thanks for Register yourself we have been 
                    send in your email,
                </h1>
                <Link to='/login'>
                    Login 
                </Link>
            </div>:
        <div className="register-container">
        <h2>Register</h2>
        <p>{Error}</p>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
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
               <div className="gender-select-container">
                <label htmlFor="gender">Select Gender:</label>
            <select onChange={(e) => setgender(e.target.value)} id="gender" name="gender">
                <option value="">Please Select One</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <br/> <br/>
            </div>
            <button id="register" type="submit">Register</button>
        </form>
        </div>
        }        
        </div>
);
}
