import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../styles/Navbar.css'
import person from '../public/person.svg'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Authcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faBoxesStacked, faGear, faHouse, faUpDown, faUpload, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import api from '../api/api'

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
        if(token){
            console.log(token)
            api.get(`/auth/api/verify`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
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
                    navigate('project1_react/#/errorpage');
                }
            })
        }

    },[]) 


    return (
        <div className='container-fluid' id='container-fluid'>
                <div className='nav-heading'>
                    <h1 id='nav-heading-h1' style={{fontfamily: ("Roboto",'sans-serif'),fontWeight:'600',paddingLeft:'5px',fontSize:'35px'}}>
                        <Link style={{textDecoration:'none', color:'#dadfe3'}} to={'/dashboard'}>
                            Musing 
                        </Link>
                    </h1>
                </div>
                {<div className='nav-components'>
                    <ul className='ul-nav'>
                        <li><Link to='/dashboard'>Home</Link></li>
                        <li><Link to='/packs'>Packs</Link></li>
                        <li><Link to='/about'>About</Link></li>
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
                                <button style={{marginTop:'0px',width:'150px',height:'40px',backgroundColor:'#dadfe3'}} className='menu-item'>Profile</button>
                            </Link>
                            <Link to={'/trackupload'}>
                                <button style={{marginBottom:'0px',width:'150px',height:'40px'}} className='menu-item'><FontAwesomeIcon style={{fontSize:'15px'}} icon={faArrowUp}/> Upload Track</button>
                            </Link>
                            <Link to={'/packupload'}>
                                <button style={{marginBottom:'0px',width:'150px',height:'40px'}} className='menu-item'><FontAwesomeIcon style={{fontSize:'15px'}} icon={faArrowUp}/> Upload Pack</button>
                            </Link>
                            <Link>
                                <button style={{marginBottom:'0px',width:'150px',height:'40px'}} onClick={logout} className="menu-item">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
                }
                

            {isauthenticated ? 
            <div className="menu">
                    <img className='profile' style={{cursor:'pointer'}} onClick={profiledialog} src={isauthenticated ? profile : person}/>
                    <Link to={'/trackupload'}>
                        <FontAwesomeIcon style={{color:'black',cursor:'pointer',fontSize:'30px',position:'relative',top:'-22px'}} icon={faUpload}/>
                    </Link>
            </div>
                :
                    <div className="menu-login">
                        <Link to={'/login'}>
                            <button className="menu-item">Login</button>
                        </Link>
                        <Link to={'/register'}>
                            <button className="menu-item">Register</button>
                        </Link>
                    </div>
                    
                    } 

                <div className='user-components'>
                    <div  class="mobile-navbar">
                        <Link style={{padding:0,marginTop:'-27px'}} to='/dashboard'>
                            <FontAwesomeIcon style={{color:'white',cursor:'pointer',fontSize:'25px'}} icon={faHouse}/>
                        </Link>
                        <Link style={{padding:0,marginTop:'-27px'}} to='/packs'>                        
                            <FontAwesomeIcon style={{color:'white',cursor:'pointer',fontSize:'25px'}} icon={faBoxesStacked}/>
                        </Link>
                        <Link style={{padding:0,marginTop:'-27px'}} to='/about'>                        
                            <FontAwesomeIcon style={{color:'white',cursor:'pointer',fontSize:'25px'}} icon={faGear}/>
                        </Link>
                    </div>
                </div>
                    {/* <div className='hamb-menu'> */}
                        {/* <div className={`hamb ${isopen? 'open':''}`} onClick={togglemenu}>
                            <span className='hamb-line'></span>
                        </div> */}
                    {/* </div> */}
        </div>
    );
}

export default Navbar;