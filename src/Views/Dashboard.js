import { render } from '@testing-library/react';
import '../styles/Dashboard.css'
import axios from 'axios';
import React, { useState } from 'react';
import Audioplayer from '../Components/Audioplayer';
import api from '../api/api';
import Searchbar from '../Components/searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../Components/Pagination'
import Loading from '../Components/Loading'

export default class Dashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.handlesearchclick = this.handlesearchclick.bind(this)
        this.state = {
            trackslist:[],
            track:[],
            query:'',
            loading:true,
            currentpage:1,
            postperpage:16,
            totalpage:'',
        }
    }
    
    async componentDidMount() {
        await api.get('/auth/api/data')
        .then(res => {
            // console.log(res.data);
            let tracks = res.data;
            console.log(res.data.length)
            this.setState({totalpage:tracks.length})
            this.setState({track:tracks})
            this.setState({tracklist:tracks})
            this.setState({loading:false})
        }).catch((err) => {
            if(err.response){
                window.location.replace('http://localhost:3000/errorpage')
            }
        })


        // console.log(this.indexoflastpost)        
        // console.log(this.indexoffirstpost)

    }
    
    
    track = () => {
        this.indexoflastpost = this.state.currentpage * this.state.postperpage;
        this.indexoffirstpost = this.indexoflastpost - this.state.postperpage;
        this.currentpost = this.state.track.slice(this.indexoffirstpost,this.indexoflastpost)
        return this.currentpost
    }
    
    componentDidUpdate() {
        // console.log(this.state.query)
        // console.log(this.state.currentpage)
        // console.log(this.state.currenttrack)
    }
    
    handlesearchclick = () =>{    
        if(this.state.query === ''){
            this.setState({track:this.state.tracklist})
            return;
        }
        
        console.log(this.state.query)
        var filtertracks = this.state.track.filter((items) => {
            if(items.trackname.toLowerCase().includes(this.state.query.toLowerCase())){
                return items;
            }
        })
        
        this.setState({track:filtertracks})
    }
    
    handlecallback = (childata) =>  {
        this.setState({query:childata})
    }

    paginatate = (selected) =>{
        this.setState({currentpage:selected})
    }

    
    render() {
        return (
            this.state.loading ? <Loading/>
            :
            <div id='main-container' className="container-fluid">
                    
                    <div className='container-fluid' id='Dashboard-container'>
                        <div style={{color:'#c1333f'}} className='dash-heading'>
                        </div>
                   </div>
                
                <Searchbar queryclick={this.handlesearchclick} querycallback={this.handlecallback}/>
                <br/>
                <section id='container-section'>
                    <h1 style={{color:'#dadfe3', fontFamily:('Roboto','sans-serif'),fontWeight:'500'}}>
                        Trending Loops
                    </h1>
                    <div className='container' id='sample-block'>
                {

                    this.track().map((tracks,number) => {                        
                        return(

                            <div key={number} className='sample'>                                                      
                            <Audioplayer
                                trackname={tracks.trackname}
                                trackartist={tracks.artistname}
                                trackkey={tracks.trackkey}
                                trackurl={tracks.trackUrl}                            
                                />
                        </div>
                            );
                        })
                }
                    </div>
                
                </section>
                <br/>
                <Pagination totalpost={this.state.totalpage} postperpage={this.state.postperpage} paginate={this.paginatate} />
            </div>
    );
  }
}