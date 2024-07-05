import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import PodcastCard from "../Components/Podcast/PodcastCard";
import InputComp from "../Components/Common/InputComp/InputComp";
const Podcasts=()=>{

    const [podcast,setPodcast] = useState([]);

    useEffect(()=>{
        const unsubSnap = onSnapshot(
            query(collection(db,"podcasts")),
            (querySnapshot)=>{
                const podcasts = [];
                querySnapshot.forEach((doc)=>{
                    podcasts.push({id:doc.id,...doc.data()});
                })
                setPodcast(podcasts);
            },
            (error)=>{
                console.log("Error",error);
            }
        )
        return()=>{unsubSnap()};
    },[])

    const [search,setSearch] = useState("");

    var filterPodcasts = podcast.filter((item)=>item.title.trim().toLowerCase().includes(search.toLowerCase()));
    return(
        <div className="podcasts">
            <h1>Podcasts Page</h1>
            <div className="podcast-input-search">
                <InputComp type="text" state={search} setState={setSearch} placeholder="Search Podcast" required={true}/>
            </div>
            {
                filterPodcasts.length>0?
                (
                    <div className="card-container"> 
                        {
                            filterPodcasts.map((item)=>(
                                    <PodcastCard key={item.id} title={item.title} description={item.description} id={item.id} displayImage={item.displayImage} />
                            ))
                        }
                        </div>
                )
                :
                (
                    <p>
                        {
                            search ? "Podcast Not Found" : "No Podcasts On Platform"
                        }
                    </p>
                )
            }
        </div>
    )
}
export default Podcasts;