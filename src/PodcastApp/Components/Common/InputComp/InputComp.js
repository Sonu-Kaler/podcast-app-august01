import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const InputComp=({type,state,setState,placeholder,required})=>{
    
    const [inputType,setInputType] = useState(type);

    const toggle=()=>{
        if(inputType==="password"){
            setInputType("text");
        }
        else{
            setInputType("password")
        }
    }
    
    return(
        <div className="input-container"> 
            <input type={inputType} value={state} onChange={(e)=>setState(e.target.value)} placeholder={placeholder} required={required} className="input-field"/>
            {
                type==="password" && (
                    <button type="button" onClick={toggle} className="toggle-button">
                        {inputType==="password"?<FaEye size={20}/>:<FaEyeSlash size={20}/>}
                    </button>
                )
            }
        </div>
    )
}
export default InputComp;