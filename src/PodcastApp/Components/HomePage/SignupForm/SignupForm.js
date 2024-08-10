import React, { useState } from "react";
import InputComp from "../../Common/InputComp/InputComp";
import Button from "../../Common/Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from "../../../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignupForm=()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const handleSignup=async()=>{
        setLoading(true);
        if(password.trim()===confirmPassword.trim() && password.length>=6 && name && email){
            try{
                // create User 
                const userCred = await createUserWithEmailAndPassword(auth,email,password);
                const user = userCred.user;

                console.log("User",user);

                

                await setDoc(doc(db,"Users",user.uid),{
                    name:name,
                    email:email,
                    uid:user.uid
                });

                dispatch(setUser({
                    name:name,
                    email:email,
                    uid:user.uid
                }))
                setLoading(false);
                toast.success("User Logged In");
                navigate("/profile");
            }
            catch(e){
                setLoading(false);
                toast.error("Error",e);
            }
        } 
        else{
            setLoading(false);
            toast.error("Error");
            if(password!==confirmPassword){
                console.log("Not Matched");
            }
            else if(password.length<6){
                console.log("Weak Password");
            }
            else{
                console.log("Fill all fields");
            }
        }
    }
    return(
        <div className="fields-box">
            <InputComp type="text" state={name} setState={setName} placeholder="Write Name" required={true} />
            <InputComp type="email" state={email} setState={setEmail} placeholder="Write Email" required={true} />
            <InputComp type="password" state={password} setState={setPassword} placeholder="Write Password" required={true} />
            <InputComp type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" required={true} />
            <Button text={loading?"Loading...":"Signup"} disabled={loading} onClick={handleSignup} />
        </div>
    )
}

export default SignupForm;