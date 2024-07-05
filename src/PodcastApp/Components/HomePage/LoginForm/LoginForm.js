import React, { useState } from "react";
import InputComp from "../../Common/InputComp/InputComp";
import Button from "../../Common/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginForm=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loading,setLoading] = useState(false);
    const handleLogin=async()=>{
        setLoading(true);
        if(email && password){
            try{
                const userCred = await signInWithEmailAndPassword(auth,email,password);
                const user = userCred.user;

                const userDoc = await getDoc(doc(db,"Users",user.uid));
                const userData = userDoc.data();

                dispatch(setUser({
                    name:userData.name,
                    email:userData.email,
                    uid:userData.uid
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
            toast.error("Fill all fields");
        }
    }
    return(
        <div className="fields-box">
            <InputComp type="email" state={email} setState={setEmail} placeholder="Write Email" required={true} />
            <InputComp type="password" state={password} setState={setPassword} placeholder="Write Password" required={true} />
            <Button text={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin} />
        </div>
    )
}

export default LoginForm;