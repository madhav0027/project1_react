import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import '../styles/productdetail.css'
import { useAuth } from '../Components/Authcon';

export default function ProductDetail() {
    
    const {productid} = useParams();
    
    const [detail,setdetail] = useState();
    const [isloading,setisloading] = useState(true)
    const [count,setcount] = useState(0)
    const [Error,setError] = useState('')
    const navigate = useNavigate()
    const user = useAuth()
    const [token,settoken] = useState(user.token || localStorage.getItem('tokenid'));
    
    const onDownload = (downloadurl) => {
        console.log('click')
        if(!token)
            navigate('/login')
        api.post('/auth/api/verify',{
            token            
        }).then(res => {
            if(res.data){
                const element = document.createElement('a');
                element.href = downloadurl;
                document.body.appendChild(element);
                element.click();
            }
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        console.log(productid);
        async function getdata(){
            await api.get('/auth/api/pack/'+productid)
            .then(res => {
                console.log(res.data)
                return res.data
            }).then(data => {
                setdetail(data)
                setisloading(false);
                if(!data._id)
                    setError("No Items Are Found")
            })
            // if( == ""){
                //     console.log(checkdata)
                //     setcheckdata(true)     
                // }
            }

        getdata()
    },[])

    return Error.length <= 0 ? (
        <div className="container-detail">

            {
                isloading ? <div>Loading</div> :
                    <div className="container" id="detail-container">
                    <div className="product-image">
                        <img src={detail.packimage}  />
                    </div>
                    <div className="product-details">
                        <div className="product-name">{detail.packname}</div>
                        <div className="product-description">
                            <p>{detail.packdescription}</p>
                        </div>
                        <button onClick={() => onDownload(detail.packzip)} className="download-button">Download</button>
                        
                        <br/><br/>
                        {/* <p><a href="#">Further Details</a></p> */}
                    </div>
            </div>
            }
        </div>
    ) : <div>{Error}</div>

};
