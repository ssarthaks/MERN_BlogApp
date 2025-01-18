import { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log("Login successful");
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="loginPage">
      <h1>Login Page</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/create-account" className="customLogin">
          <p>Don't have an account?</p> <p>Click here</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
