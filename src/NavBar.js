import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "./hooks/useUser";
import "./css/navbar.css"; // Import the CSS file for styling

const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logout successful");
      navigate("/login"); // Redirect to login page after logout
    } catch (e) {
      console.error("Logout failed: ", e.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            MyBlog
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li>
            <Link to="/articles" className="navbar-link">Articles</Link>
          </li>
          {user ? (
            <li className="nav-item">
              <button className="nav-btn" onClick={handleLogout}>
                <HiOutlineLogin className="nav-icon" />
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-btn">
                <FaUserCircle className="nav-icon" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
