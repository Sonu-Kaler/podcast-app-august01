import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
const AudioPlayer=({audioSrc,image})=>{
    
    const audioRef = useRef();
    const [isPlay,setPlay] = useState(true);

    const togglePlay=()=>{setPlay(!isPlay)};

    useEffect(()=>{
        if(isPlay){
            audioRef.current.play();
        }   
        else{
            audioRef.current.pause();
        }
    },[isPlay])

    const [volume,setVolume] = useState(1);
    const [isMute,setMute] = useState(false);

    const toggleMute=()=>{setMute(!isMute)};

    useEffect(()=>{
        if(!isMute){
            audioRef.current.volume=1;
            setVolume(1);
        }
        else{
            audioRef.current.volume=0;
            setVolume(0);
        }
    },[isMute])

    const handleVolume=(e)=>{
        setVolume(e.target.value)
    }

    const [currentTime,setCurrentTime] = useState(0);
    const [duration,setDuration] = useState("");
    const handleDuration=(e)=>{
        setCurrentTime(e.target.value);
        audioRef.current.currentTime=e.target.value;
    }


    useEffect(()=>{

        const audio = audioRef.current;

        audio.addEventListener("timeupdate",handleTimeUpdate);
        audio.addEventListener("loadedmetadata",handleMetaData);
        audio.addEventListener("ended",handleEnded);

        return()=>{
            audio.removeEventListener("timeupdate",handleTimeUpdate);
            audio.removeEventListener("loadedmetadata",handleMetaData);
            audio.removeEventListener("ended",handleEnded);
        }
    },[])

    const handleTimeUpdate=()=>{setCurrentTime(audioRef.current.currentTime)};

    const handleMetaData=()=>{setDuration(audioRef.current.duration)};

    const handleEnded=()=>{
        setCurrentTime(0);
        setPlay(false);
    }


    const formatTime=(time)=>{
        const min = Math.floor(time/60);
        const sec = Math.floor(time%60);

        return `${min}:${sec<10?"0":""}${sec}`;
    }
    return(
        <div className="audio-player-container">
            <div className="audio-image-container">
                <img src={image} style={{width:"30px",height:"30px",borderRadius:"50%"}}/>
            </div>
            <audio src={audioSrc} ref={audioRef} />

            <div className="duration-flex">
                <p onClick={togglePlay}>{isPlay?<FaPause/>:<FaPlay/>}</p>
                {formatTime(currentTime)}
                <input type="range" value={currentTime} max={duration} step={0.01} onChange={handleDuration} className="duration-bar" />
                {formatTime(duration-currentTime)}
            </div>
            <div className="volume-flex">
                <p onClick={toggleMute}>{!isMute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
                <input type="range" value={volume} max={1} min={0} step={0.01} onChange={handleVolume} className="volume-bar"/>
            </div>
        </div>
    )
}
export default AudioPlayer;