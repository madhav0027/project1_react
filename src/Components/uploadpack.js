import React, { useState } from "react";
import '../styles/trackupload.css'
// import api from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/api";

const MusicPackUploadForm = () => {
  const [artistname,setArtistName] = useState("");
  const [PackName, setPackName] = useState("");
  const [PackDesc,setPackDesc] = useState("");
  const [image, setPackImage] = useState("");
  const [zip, setPackZip] = useState(null);
  const [token,settoken] = useState(localStorage.getItem("sessionid") || localStorage.getItem('tokenid'));

  const navigate = useNavigate();

  const handlePackNameChange = (e) => setPackName(e.target.value);
  const handlePackDescChange = (e) => setPackDesc(e.target.value);
  const handlePackFileChange = (e) => setPackZip(e.target.files[0]);
  const handlePackImageChange = (e) => setPackImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append('token',token)
    formdata.append('packdescription',PackDesc)
    formdata.append('packname',PackName)
    formdata.append('document',zip);
    formdata.append('image',image);
    console.log("click",PackName,PackDesc,zip)
      await api.post('/auth/api/packupload', formdata,{
        headers:{
          'Accept':'*/*',
          'content-type': 'multipart/form-data',
        }
      } 
      )
      .then((res) => {
        if(res.status === 440){
          localStorage.clear();
          alert("Session has been expired!.Please log in again");
          navigate('/login');
        }else
        if(res.data){
            setArtistName(res.data.artistname)
            navigate('/profile')
            window.location.reload();
            return;
        }
    }).catch((err) => {
      if(err.response){
        navigate('/errorpage');
    }
    })
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} className="music-upload-form">
      <div className="form-group">
        <label htmlFor="PackName">Pack Name:</label>
        <input
          type="text"
          id="PackName"
          value={PackName}
          onChange={handlePackNameChange}
          placeholder="Enter Pack name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="PackDesc">Pack Description:</label>
        <textarea
          style={{width:'350px',border:'1px solid #ccc',height:'100px',padding:'8px',resize:'none'}}
          type="text"
          id="packdesc"
          value={PackDesc}
          onChange={handlePackDescChange}
          placeholder="Enter Description about Pack"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="packimage">Pack Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".png, .jpeg"
          onChange={handlePackImageChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="PackZip">Upload Pack:</label>
        <input
          type="file"
          name="zip"
          id="zip"
          accept=" .zip"
          onChange={handlePackFileChange}
          required
        />
      </div>


      <button className="uploadtrack" type="submit">Upload Pack</button>
    </form>
  );
};

export default MusicPackUploadForm;
