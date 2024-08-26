import React, { useEffect, useState } from 'react';
import '../styles/Profile.css'
import api from '../api/api';
import { useAuth } from '../Components/Authcon';
import Loading from '../Components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


export default function Profile () {

    const auth = useAuth();
    let token = localStorage.getItem('sessionid');
    const [username,setusername] = useState('');
    const [profile,setprofile] = useState('');
    const [track,settrack] = useState([]);
    const [pack,setpack] = useState([]);
    const [loading,setloading] = useState(true);
    const [isopen,setisopen] = useState(false);
    const [isopen1,setisopen1] = useState(false);
    const [status,setstatus] = useState('');
    const [trackname,settrackname] = useState('');
    const [trackkey,settrackkey] = useState('');
    const [trackid,settrackid] = useState();
    const [packname,setpackname] = useState('');
    const [packdescription,setpackdescription] = useState('');
    const [packid,setpackid] = useState();
    const [error,seterror] = useState(false);
    const navigate = useNavigate();

    const opendialoag = (selected) => {
      console.log("clicked")
      setisopen(true);
      settrackid(selected);
    }

    const closeddialog = () => {
      console.log('close')
      setisopen(false);
    }

    const opendialoag1 = (selected) => {
      console.log("clicked")
      setisopen1(true);
      setpackid(selected);
    }

    const closeddialog1 = () => {
      console.log('close')
      setisopen1(false);
    }

    const handletrackkey = (e) => {
      settrackkey(e.target.value)
    }
    const handletrackname = (e) => {        
      settrackname(e.target.value)
    }
    const handlepackname = (e) => {
      setpackname(e.target.value)
    }
    const handlepackdescription = (e) => {
      setpackdescription(e.target.value)
    }

    const handlesubmit1 = async (e) => {
      e.preventDefault();

      console.log(packname,packdescription);

      if(packname === '')
        setstatus('Opps,forget Packname')
      else if(packdescription === '')
        setstatus('Opps,forget PackDescription')
      else {
          api.put(`/auth/api/updatepack?token=${token}`,{
            packid,
            packname,packdescription
        }).then(res => {
          if(res.data){
            seterror(true)
            setstatus(res.data.message);
            window.location.reload();
            return;
          }
        })
        .catch((err) => {
          if(err.response.status === 440){
            auth.logout();
            return;
          }else if(err.response){
            navigate('/errorpage');
        }
        })   
      }
    }


    const handlesubmit = async (e) => {
      e.preventDefault();
      

      console.log(trackkey,trackname);
      if(trackkey === '')
        setstatus('Opps,forget write key')
      else if(trackname === '')
        setstatus('Opps,forget write name')
      else{
          api.put(`/auth/api/updatetrack?token=${token}`,{
            trackid,
            trackkey,trackname
          }).then(res => {
            if(res.data){
              setstatus(res.data.message);
              window.location.reload();
              return;
            }
          })
          .catch((err) => {
            if(err.response.status === 440){
              auth.logout();
              return;
            }else if(err.response){
              navigate('/errorpage');
          }
          })
          
    }
    }


    useEffect(() => {
      async function apidata(){
        await api.post(`/auth/api/profile?token=${token}`)
        .then((res) => {
          // if(res.data){
            console.log(res.data)
            setusername(res.data.username)
            setprofile(res.data.profilepic)
            settrack(res.data.users)
            setpack(res.data.pack);
            console.log([res.data.users])
            setloading(false)
            return;
        }).catch((err) => {
          if(err.response.status === 440){
            auth.logout();
            return;
          }else if(err.response){
            navigate('/errorpage');
        }
        })
      }
      apidata()

    },[])

  return (
    loading ? <Loading/> :
    <div className='Profile'>
      <div className="user-profile">
        <img src={profile} className="profile-picture" />
        <br/> <br/>
        <h2 style={{color:'#dddddd'}}>{username}</h2>
        </div>
        {error} ? <div>"Nothing Has Been Uploaded !"</div> 
        :
          <div className="details">
            <div className='tracks-list'>
                  <table>
                    <thead>
                      <tr>
                        <th>TrackName</th>
                        <th>ArtistName</th>
                        <th>TrackKey</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                {
                  track.map((tracks,num) => {
                    return (
                      <tr key={num}>
                        <td>{tracks.trackname}</td>
                        <td>{tracks.artistname}</td>
                        <td>{tracks.trackkey}</td>
                        <td onClick={() => opendialoag(tracks._id)} id='edit'><FontAwesomeIcon icon={faEdit}/></td>
                      </tr>
                              );
                            })}
                   </tbody>
                  </table>
                  { isopen &&
                            track.map((tracks,num) => {
                              return (
                    <div>
                      <div className="dialog-overlay">
                        <div className="dialog">
                          <div className='btn-closed'>
                            <button onClick={closeddialog} id='btn-close'><FontAwesomeIcon icon={faClose}/></button>
                          </div>
                                <div className='form-group'>
                              <form id='dialog-form'>
                                <h2>{status}</h2>
                                <label>TrackName</label>
                                <input 
                                type='text' 
                                id='input-dialog'
                                className='trackname' 
                                placeholder={tracks.trackname}
                                onChange={handletrackname}/>
                                <br/>
                                <label>TrackKey</label>
                                <input 
                                type='text' 
                                id='input-dialog' 
                                className='trackkey' 
                                placeholder={tracks.trackkey} 
                                onChange={handletrackkey}
                                />
                                <button onClick={handlesubmit} id='Submit-dialog'>Submit</button>
                              </form>
                            </div>
                        </div>
                    </div>
                    </div>);
                    })
                  }
                </div>
        </div>
        <div className="details-pack">
            <div className='packs-list'>
                  <table>
                    <thead>
                      <tr>
                        <th>PackName</th>
                        <th>ArtistName</th>
                        <th>PackDescription</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                {
                  pack.map((packs,num) => {
                    return (
                      <tr key={num}>
                        <td>{packs.packname}</td>
                        <td>{packs.artistname}</td>
                        <td style={{maxWidth:'100px'}}>{packs.packdescription}</td>
                        <td onClick={() => opendialoag1(packs._id)} id='edit'><FontAwesomeIcon icon={faEdit}/></td>
                      </tr>
                              );
                            })}
                   </tbody>
                  </table>
                  { isopen1 &&
                            pack.map((packs,num) => {
                              return (
                    <div>
                      <div className="dialog-overlay">
                        <div className="dialog">
                          <div className='btn-closed'>
                            <button onClick={closeddialog1} id='btn-close'><FontAwesomeIcon icon={faClose}/></button>
                          </div>
                                <div className='form-group'>
                              <form id='dialog-form'>
                                <h2>{status}</h2>
                                <label>PackName</label>
                                <input 
                                type='text' 
                                id='input-dialog'
                                className='packname' 
                                placeholder={packs.packname}
                                onChange={handlepackname}/>
                                <br/>
                                <label>PackDescription</label>
                                <textarea 
                                type='text' 
                                style={{height:'150px',width:'300px',resize:'none'}}
                                id='input-dialog' 
                                className='packdescription' 
                                placeholder={packs.packdescription} 
                                onChange={handlepackdescription}
                                />
                                <button onClick={handlesubmit1} id='Submit-dialog-pack'>Submit</button>
                              </form>
                            </div>
                        </div>
                    </div>
                    </div>);
                    })
                  }
                </div>
        </div>
      
      </div>
    );

}
    