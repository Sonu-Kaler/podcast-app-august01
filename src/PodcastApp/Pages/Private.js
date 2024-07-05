import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase";
import { Navigate, Outlet } from "react-router-dom";
const Private=()=>{
    const [user,error,loading] = useAuthState(auth);
    if(loading){
        return <p>Loading...</p>
    }
    else if(!user || error){
        return <Navigate to="/" replace/>
    }
    else{
        return <Outlet />
    }
}
export default Private;