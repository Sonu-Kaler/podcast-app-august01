import React, { useState } from "react";
const FileInput=({accept,id,text,handleFn})=>{
    const [fileSelected,setFileSelected] = useState();

    const hanldeChange=(e)=>{
        console.log(e.target.files[0]);
        setFileSelected(e.target.files[0].name);
        handleFn(e.target.files[0]);
    }
    return(
        <div className="fileInput">
            <label htmlFor={id}>
                {fileSelected ? `This ${fileSelected} is selected` : text}
            </label>
            <input type="file" accept={accept} id={id} onChange={hanldeChange} style={{display:"none"}}/>
        </div>
    )
}
export default FileInput;