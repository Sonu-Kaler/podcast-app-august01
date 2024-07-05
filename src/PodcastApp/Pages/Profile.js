import React from "react";
import { useSelector } from "react-redux";
import Button from "../Components/Common/Button/Button";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { FaUserCircle } from "react-icons/fa";
import { setUser } from "../../Redux/userSlice";
const Profile=()=>{
    const user = useSelector((state)=>state.users.users);
    if(!user){
        return <p>Loading...</p>
    }

    const logout=()=>{
        signOut(auth).then(() => {
            toast.success("Logged Out!")
            // Sign-out successful.
            setUser(null);
          }).catch((error) => {
            toast.error("Error",error);
            // An error happened.
          });
    }
    return(
        <div className="profile">
            <h1>Profile Page</h1>
            <FaUserCircle size={100}/>
            <p>{user.name}</p>
            <Button text={"Logout"} onClick={logout}/>
        </div>
    )
}
export default Profile;