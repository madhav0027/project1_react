import React, { useState } from "react";
import '../styles/trackupload.css'
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MusicTrackUploadForm = () => {
  const [artistname,setArtistName] = useState("");
  const [trackname, setTrackName] = useState("");
  const [trackkey, setTrackKey] = useState("");
  const [track, settrack] = useState(null);
  const [token,settoken] = useState(localStorage.getItem("sessionid") || localStorage.getItem('tokenid'));

  const navigate = useNavigate();

  const handleTrackKeyChange = (e) => setTrackKey(e.target.value);
  const handleTrackNameChange = (e) => setTrackName(e.target.value);
  const handletrackChange = (e) => settrack(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('token',token)
    formdata.append('trackname',trackname)
    formdata.append('trackkey',trackkey)
    formdata.append('track',track);
    await axios.post('/auth/api/trackupload',
        formdata,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'content-type': 'multipart/form-data',
          }
    }).then((res) => {
      if(res.status === 440){
        localStorage.clear();
        alert("Session has been expired!.Please log in again");
        navigate('/login');
      }else if(res.data){
            setArtistName(res.data.artistname)
            navigate('/profile')
            window.location.reload();
            return;
        }
    }).catch((err) => {if(err.response){
      navigate('/#/errorpage');}
  })
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} className="music-upload-form">
            <div className="form-group">
        <label htmlFor="trackName">Track Name:</label>
        <input
          type="text"
          id="trackName"
          value={trackname}
          onChange={handleTrackNameChange}
          placeholder="Enter track Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="trackKey">Track Key:</label>
        <input
          type="text"
          id="trackkey"
          value={trackkey}
          onChange={handleTrackKeyChange}
          placeholder="Enter track key (e.g., C major, G minor)"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="track">Upload Track:</label>
        <input
          type="file"
          id="track"
          accept=".mp3, .wav"
          onChange={handletrackChange}
          required
        />
      </div>

      <button className="uploadtrack" type="submit">Upload Track</button>
    </form>
  );
};

export default MusicTrackUploadForm;
