import React from "react";
const Button=({text,onClick,disabled})=>{
    return(
        <div>
            <button className="btn" onClick={onClick} disabled={disabled}>{text}</button>
        </div>
    )
}
export default Button;