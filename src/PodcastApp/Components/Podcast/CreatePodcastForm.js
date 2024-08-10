import React, { useState } from "react";
import InputComp from "../Common/InputComp/InputComp";
import FileInput from "../Common/FileInput/FileInput";
import Button from "../Common/Button/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const CreatePodcastForm=()=>{
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [displayImage,setDisplayImage] = useState();
    const [bannerImage,setBannerImage] = useState();

    const [loading,setLoading] = useState(false);
    const displayImageFn=(file)=>{setDisplayImage(file)};
    const bannerImageFn=(file)=>{setBannerImage(file)};

    const navigate = useNavigate();
    const handleSubmit=async()=>{
        setLoading(true);
        if(title && desc && displayImage && bannerImage){
            try{

                const displayImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                )
                await uploadBytes(displayImageRef,displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef);

                const bannerImageRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                )
                await uploadBytes(bannerImageRef,bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef);

                const podcastData={
                    title:title,
                    description:desc,
                    createdBy:auth.currentUser.uid,
                    displayImage:displayImageUrl,
                    bannerImage:bannerImageUrl
                }

                await addDoc(collection(db,"podcasts"),podcastData);
                setLoading(false);
                toast.success("Podcast Created");
                navigate("/podcasts");
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
        <div className="fields-box">
            <h1>Create Podcast</h1>
            <InputComp type="text" state={title} setState={setTitle} placeholder="Write Title" required={true}/>
            <InputComp type="text" state={desc} setState={setDesc} placeholder="Write Description" required={true}/>
            <FileInput accept={"image/*"} id="displayImageInput" text={"Upload Display Image"} handleFn={displayImageFn}/>
            <FileInput accept={"image/*"} id="bannerImageInput" text={"Upload Banner Image"} handleFn={bannerImageFn}/>
            <Button text={loading?"Loading...":"Create Podcast"} disabled={loading} onClick={handleSubmit}/>
        </div>
    )
}
export default CreatePodcastForm;