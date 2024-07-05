import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/podcasts">Podcasts</Link>
            <Link to="/createPodcast">Create Podcast</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}

export default Navbar;