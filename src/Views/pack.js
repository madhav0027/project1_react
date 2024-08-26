import { useState } from 'react';
import '../styles/packs.css'
import { Link } from 'react-router-dom';

const Pack = ({pack,loading}) => {
    if(loading){
        return(
            <div>Loading ...</div>
        );
    }

    return(
        <div id='container-section-pack' className='container'>
            {
                pack.map((packs) => {
                    return(
                        <div key={packs._id} id="packs-container" >
                            <Link style={{ textDecoration:'none',color:'black'}} to={`/detail/${packs._id}`} >
                        <div id='packs'>
                            <img id='pack-image' src={packs.packimage}/>                                                        
                            <br/>
                            <p style={{flex:'1',fontFamily:('Roboto','sans-serif'),fontSize:'20px',color:'#adadad',fontWeight:'500'}}>{packs.packname}</p>
                            <p style={{flex:'1',fontFamily:('Roboto','sans-serif'),fontSize:'20px',color:'#adadad',fontWeight:'500'}}>by {packs.artistname}</p>
                            <br/>
                        </div>
                            </Link>
                </div>
                );
                })
            }
        </div>
    );
}

export default Pack;