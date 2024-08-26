import { useEffect, useState } from "react";
import api from "../api/api";
import '../styles/packs.css'
import Pack from "../Views/pack";
import Paginate from '../Components/Pagination'
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";


function Packs() {

    const navigate = useNavigate()
    const [isloading,setisloading] = useState(true);
    const [pack,setpack] = useState([])
    const [totalpost,settotalpost] = useState();
    const [currentpage,setcurrentpage] = useState(1);
    const [postPerPage] = useState(16)

    async function packvalue () {
        await api.get("/auth/api/pack")
            .then(res => {
                console.log(res.data.length)
                settotalpost(res.data.length)
                setpack(res.data);
                console.log(pack)
                setisloading(false);
            }).catch((err) => {
                if(err.response){
                    navigate('/errorpage');
                }
            })
        // return pack;
    }


    const indexoflastpost = currentpage * postPerPage;
    const indexoffirstpost = indexoflastpost - postPerPage;
    const currentpost = pack.slice(indexoffirstpost,indexoflastpost)

    const paginate = (selected) => {
        setcurrentpage(selected)
    }

    useEffect (() =>{
        packvalue()
    },[])
    

    return(
        isloading ? <Loading/>
        :
        <div className="container-fluid">
                <div className='container-fluid' id='Dashboard-container'>
                    <div className='dash-heading'>
                    </div>
                </div>            
            <h1 style={{color:'#fff',fontFamily:('Roboto','sans-serif')}}>
                Packs
            </h1>
            <div className="container" >
                        <div className="container" id="container-section-pack">
                            <div id="pack-main">
                                <Pack pack={currentpost} loading={isloading}/>
                            </div>
                        </div>
            </div>
            <br/>
            <div className="container" id="page-container">
                <Paginate totalpost={totalpost} postperpage={postPerPage} paginate={paginate}/>
            </div>
        </div>
    );
}

export default Packs;