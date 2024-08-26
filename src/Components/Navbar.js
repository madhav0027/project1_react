import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../styles/Navbar.css'
import person from '../public/person.svg'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Authcon'
import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faUpDown, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { faUps } from '@fortawesome/free-brands-svg-icons'
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'

function Navbar()
{
    const user = useAuth();
    const navigate = useNavigate();
    const [isopen,setopen] = useState(true);
    const [islogin,setlogin] = useState(false);
    const [username,setusername] = useState()
    const [profile,setprofile] = useState()
    const token = localStorage.getItem("sessionid");
    const [isauthenticated,setisauthenticated] = useState(false);
    const [profileopen,setproifleopen] = useState(false);

    const togglemenu = () => {
            setopen(!isopen)
    }

    const logout = () => {
        user.logout(); 
        setlogin(false);
        return;
    }

    const profiledialog = () => {
        if(!profileopen)
            setproifleopen(true);
        else
            setproifleopen(false);
    }

    useEffect(() => {            
        setproifleopen(false);
        if(window.screen.availWidth > 768){
            console.log('open')
            setopen(true)
        }
        if(token){
            console.log(token)
            api.post(`/auth/api/verify?token=${token}`)
            .then((res) => {
                    console.log(res.status);
                    setisauthenticated(true); 
                    setusername(res.data.username);
                    setprofile(res.data.profilepic)
            })
            .catch((err) => {
                if(err.response.status === 440){
                    setisauthenticated(false);
                    user.logout();
                }else if(err.response){
                    navigate('/errorpage');
                }
            })
        }

    },[]) 
    
    


    return (
        <div className='container-fluid' id='container-fluid'>
                <div className='nav-heading'>
                    <h1 style={{fontfamily: ("Roboto",'sans-serif'),fontWeight:'600',paddingLeft:'5px',fontSize:'35px'}}>
                        <Link style={{textDecoration:'none', color:'#dadfe3'}} to={'/dashboard'}>
                            Musing 
                        </Link>
                    </h1>
                </div>
                {isopen &&<div className='nav-components'>
                    <ul className='ul-nav'>
                        <li><a href='/dashboard'>Home</a></li>
                        {/* <li><a href='/samples'>Samples</a></li> */}
                        <li><a href='/packs'>Packs</a></li>
                        <li><a href='/about'>About</a></li>
                        <li>
                        {isauthenticated ? <span className='username'>{username}</span> : <span className='username'></span> }
                        </li>
                    </ul>
                </div> }

            { profileopen &&                
                <div className='profile-dialog-overlay'>
                    <div className='profile-dialog'>
                        <div className='dialog-profile'>
                            <Link to={'/profile'}>
                                <button style={{marginBottom:'5px',width:'150px',height:'40px',backgroundColor:'#dadfe3'}} className='menu-item'>Profile</button>
                            </Link>
                            <Link to={'/trackupload'}>
                                <button style={{marginBottom:'5px',width:'150px',height:'40px'}} className='menu-item'><FontAwesomeIcon style={{fontSize:'15px'}} icon={faArrowUp}/> Upload Track</button>
                            </Link>
                            <Link to={'/packupload'}>
                                <button style={{marginBottom:'5px',width:'150px',height:'40px'}} className='menu-item'><FontAwesomeIcon style={{fontSize:'15px'}} icon={faArrowUp}/> Upload Pack</button>
                            </Link>
                                <button style={{marginBottom:'5px',width:'150px',height:'40px'}} onClick={logout} className="menu-item">Logout</button>
                        </div>
                    </div>
                </div>
                }
                

            {isauthenticated ? <div className="menu">
                    <img className='profile' style={{cursor:'pointer'}} onClick={profiledialog} src={isauthenticated ? profile : person}/>

            </div>
                :
                    isopen &&<div className="menu-login">
                        <Link to={'/login'}>
                            <button className="menu-item">Login</button>
                        </Link>
                        <Link to={'/register'}>
                            <button className="menu-item">Register</button>
                        </Link>

                    </div>}

                <div className='user-components'>
                 { isopen &&  <ul className='user-items'>
                    </ul> }
                    <div className='hamb-menu'>
                        {/* <input type='checkbox' className='slide-menu'  /> */}
                        <div className={`hamb ${isopen? 'open':''}`} onClick={togglemenu}>
                            <span className='hamb-line'></span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Navbar