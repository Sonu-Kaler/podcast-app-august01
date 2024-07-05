import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import Button from "../Common/Button/Button";
import Episodes from "../Episode/Episodes";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const PodcastDetails=()=>{
    const {id} = useParams();
    // here i want to get the data pf currnet podcast from podcasts - using id


    const navigate = useNavigate();
    useEffect(()=>{
        if(id){
            getData();
        }
    },[id])

    const [podcast,setPodcast] = useState([]);

    const getData=async()=>{
        try{
            const docRef = doc(db,"podcasts",id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log("Found");
                setPodcast({id:id,...docSnap.data()});
            }
            else{
                console.log("Not");
            }
        }
        catch(e){
            console.log("Error",e);
        }
    }

    const [episodes,setEpisodes] = useState([]);

    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot)=>{
                const episodes = [];
                querySnapshot.forEach((doc)=>{
                    episodes.push({id:doc.id,...doc.data()});
                })
                setEpisodes(episodes);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{unsubSnap()};
    },[id])

    const [isPlay,setPlay] = useState();
    return(
        <div className="podcast-details">
            <div className="details-top">
            <h1>
            {podcast.title}
            </h1>
            
            {
                auth.currentUser.uid === podcast.createdBy && (
                    <button className="create-episode" onClick={()=>navigate(`/podcast/${id}/createEpisode`)}>Create Episode</button>
                )
            }
            {/* <Button text={"Create Episode"} className="episode-btn" onClick={()=>navigate(`/podcast/${id}/createEpisode`)}/> */}
            </div>
            <div className="podcast-banner-image">
            <img src={podcast.bannerImage}/>
            </div>
            <p className="podcast-description">
            {podcast.description}
            </p>
            <div className="podcast-episode">
            <h2>Episodes - </h2>
            {
                episodes.length>0 &&
                (
                    <ol>
                        {
                        episodes.map((item,index)=>(
                            <Episodes key={item.id} index={index+1} title={item.title} description={item.description} onClick={()=>setPlay(item.audio)}/>
                        ))
                        }
                    </ol>
                )
            }
            </div>

            {
                isPlay && (
                    <AudioPlayer audioSrc={isPlay} image={podcast.displayImage}/>
                )
            }

            
        </div>
    )
}
export default PodcastDetails;