import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComp from "../Common/InputComp/InputComp";
import FileInput from "../Common/FileInput/FileInput";
import Button from "../Common/Button/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode=()=>{
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [audio,setAudio] = useState("");

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const audioFileFn=(file)=>{setAudio(file)};
    const handleSubmit=async()=>{
        setLoading(true);
        if(title && desc && audio){
            try{

                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                )

                await uploadBytes(audioRef,audio);

                const audioUrl = await getDownloadURL(audioRef);

                const episodeData={
                    title:title,
                    description:desc,
                    audio:audioUrl,
                    createdBy:auth.currentUser.uid
                }
                await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                setLoading(false);
                toast.success("Episode Created");
                navigate(`/podcast/${id}`);
            }
            catch(e){
                setLoading(false);
                toast.error("Error",e);
            }
        }
        else{
            setLoading(false);
            toast.error("Fill all fields");
        }
    }
    return(
        <div className="form">
            <h1>Create Episode</h1>
            <InputComp type="text" state={title} setState={setTitle} placeholder="Write Title" required={true}/>
            <InputComp type="text" state={desc} setState={setDesc} placeholder="Write Description" required={true}/>
            <FileInput accept={"audio/*"} id="audioFileInput" text={"Upload Audio File"} handleFn={audioFileFn} />
            <Button text={loading?"Loading...":"Create Episode"} disabled={loading} onClick={handleSubmit} />
            
        </div>
    )
}
export default CreateEpisode;