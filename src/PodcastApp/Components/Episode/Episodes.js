import React from "react";
import Button from "../Common/Button/Button";
const Episodes=({index,title,description,audio,onClick})=>{
    return(
        <div className="episode">
            <h3>{index}. {title}</h3>
            <div className="episode-description">
            <p>{description}</p>
            <Button text={"Play"} onClick={()=>onClick(audio)}/>
            </div>
        </div>
    )
}
export default Episodes;