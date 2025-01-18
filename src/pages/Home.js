import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css"; 
import myImage from "../assets/Background.jpg"; 

const Homepage = () => {
  return (
    <div className="homepage">
      <img src={myImage} alt="Welcome" className="heroImage" />
      <h1 className="title">Welcome to My Blog!</h1>
      <p className="description">
        Explore my journey as I build dynamic web applications using the MERN
        stack.
      </p>
      <Link to="/articles">
        <button className="ctaButton">Start Reading</button>
      </Link>
    </div>
  );
};

export default Homepage;
