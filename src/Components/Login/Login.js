import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="container-login">
            <div className="login-text">
                <h1>Login</h1>
            </div>

            <div className="new-member"> Are you a new member?
                <Link to="/SignUp"><span> Sign Up</span></Link>
            </div> 
            
        <form onSubmit={login}>
            <div className="form-group-login">
                <label className="Email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="Email" name="Email" id="Email" required className="form-control" placeholder="Enter your email" aria-describedby="Email input box" />
            </div>

            <div className="form-group-login">
                <label htmlFor="password">Password</label><span>Forgot Password?</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="Password inbput box"/>
                
            </div>

            <div className="btn-group">
                <button type="submit" class="btn submit-btn">Submit</button>
                <button type="reset" class="btn reset-btn">Reset</button>
            </div>
            
        </form>
    </div>
  );
};
export default Login;