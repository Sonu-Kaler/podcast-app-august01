import React, { useState } from "react";
import SignupForm from "../Components/HomePage/SignupForm/SignupForm";
import LoginForm from "../Components/HomePage/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { auth } from "../../firebase";
const Home=()=>{
    const [flag,setFlag] = useState(false);
    return(
        <div>
            {
                auth.currentUser ? (
                    <div className="home-page-user">
                        <div className="home-user-box">
                        <p>Welcome {auth.currentUser.name} Check out our Podcasts !</p>
                        <p>And create your own <FaHeart /></p>
                        </div>
                    </div>
                )
                :
                (
            <div className="form">
            {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
            {!flag ? (<SignupForm />):(<LoginForm />)}
            {!flag ? (<p onClick={()=>setFlag(!flag)} style={{cursor:"pointer"}}>Click to Login</p>)
            :(<p onClick={()=>setFlag(!flag)} style={{cursor:"pointer"}}>Click to Signup</p>)}
            </div>
                )
            }

        </div>
    )
}
export default Home;