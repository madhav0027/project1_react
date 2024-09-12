import React, { Component, useEffect, useRef, useState } from "react";
import '../styles/wavesurfer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import { faPlay, faStop, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import WavesurferPlayer from '@wavesurfer/react'
import { AuthContext } from "./Authcon";
import api from "../api/api";

export default class Audioplayer extends React.Component{

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            token:null,
            playing:false,
            waveform:null,
            duration:null,
            download:''
        }
    }

    async componentDidMount() {
        this.setState({token:this.context.token||localStorage.getItem('tokenid')})
        // console.log(this.state.token)
     }

    onready = async (ws) => {
        const duration = ws.getDuration()
        this.setState({waveform:ws,duration})
    }
    

    onplay = () => {
        this.state.waveform.play();
        console.log('play')
        this.setState({playing:true})
    }

    onpause = () => {
        this.state.waveform.pause();
        console.log('pause')
        this.setState({playing:false})
    }

    onDownload = (downloadurl) => {
        console.log('click')
        let token = this.state.token;
        if(!token)
            window.location.replace(`${api.getUri()}/login`)
        else{
            const element = document.createElement('a');
            element.href = downloadurl;
            document.body.appendChild(element);
            element.click();
        }
    }

  render() {
    return(
            <div>
            {
                <div id="audio-container">
                {
                    <div className="container" id="track-container">    
                        <div id="wave">
                            {/* {console.log(this.props.trackurl)} */}
                        <WavesurferPlayer
                        onReady={this.onready}
                        height={20}
                        cursorWidth={0}
                        progressColor={'#775683'}
                        waveColor="#af8bd9"
                        normalize
                        onPlay={() => !this.state.playing}
                        onPause={() => this.state.playing}
                        url={(this.props.trackurl)}
                        />
                        </div>
                        <br/>
                        <p className="track-name"><a href="">{this.props.trackname}</a></p>
                        <div id="track-data">
                            <p className="track-scale">{this.props.trackkey}</p>
                            <p className="track-time">{(String(Math.floor((this.state.duration % 3600)/60)).padStart(2,'0')+":"+ String(Math.ceil(this.state.duration%60)).padStart(2,'0'))}</p>
                            <button onClick={this.onplay} className="track-play"><FontAwesomeIcon className="icon" icon={faPlay }/></button>
                            <button onClick={this.onpause} className="track-stop"><FontAwesomeIcon className="icon" icon={faStop} /></button>
                        </div>
                        <p style={{fontWeight:'400',fontFamily:('Roboto',"sans-serif")}} className="track-name">by {this.props.trackartist}</p>
                        <div style={{display:"flex", fontSize:"20px", position:"relative",top:"-10px"}}>
                        <button onClick={() => {this.onDownload(this.props.trackurl)}} className="track-download"><FontAwesomeIcon className="icon-3" icon={faDownload} /></button>
                        </div>
                    </div>
                }
                </div>
                }    
            </div>   
        );
    }
}
