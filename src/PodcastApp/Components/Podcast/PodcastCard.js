import React from "react";
import { Link } from "react-router-dom";

const PodcastCard=({title,displayImage,description,id})=>{
    return(
        <div className="podcast-card">
            <Link style={{textDecoration:"none"}} to={`/podcast/${id}`}>
            <h2>{title}</h2>
            <img className="podcast-image" src={displayImage} />
            <p>{description}</p>
            <p>{}</p>
            </Link>
        </div>
    )
}
export default PodcastCard;