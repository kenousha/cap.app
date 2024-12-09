import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        setUsername(false);
   
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            sessionStorage.removeItem(key);
          }
        }
        setEmail(email);
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail.split('@')[0]);
          }
        }, []);
  

  return (
    <nav>
            
        <div className="logo">
            <Link to="/">
            StayHealthy 
            <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
            <span>.</span>
            </Link>
        </div>

        <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
        
        <ul className={click ? 'menu active' : 'menu'}>
            <li className="item"> <Link to="/" > Home </Link> </li>
            <li className="item"> <Link to="/InstantConsultation"> Instant Consultation </Link></li>
            <li className="item"> <Link to="/BookingConsultation"> Appointments </Link></li>
            <li className="item"> <Link to="/HealthBlog">Health Blog </Link></li>
            <li className="item"> <Link to="/Reviews">Reviews </Link></li>
            {isLoggedIn?(
                <>
                    <li className="welcome-user" onClick={handleDropdown} >
                    <p>Welcome, {username} {showDropdown ?(<span class="fa fa-caret-down"/>):(<span class="fa fa-caret-right"/>)} </p>
                    {showDropdown ? (
                    <ProfileCard username={username}/>
                    ) : null}
                    </li>
                    <li className="item">
                    <button className="btn2" onClick={handleLogout}>
                        Logout
                    </button>
                    </li>
                    
                </>
                ) : (
                <>
                    <li className="item"> <Link to="/SignUp"><button className="btn1">Sign Up</button></Link></li>
                    <li className="item"> <Link to="/Login"> <button className="btn2">Login</button></Link></li>
                </>
                )}
        </ul>
    </nav>
  );
};

export default Navbar;