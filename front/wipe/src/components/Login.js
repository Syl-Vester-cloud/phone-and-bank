

import { useState } from "react";
import "../design/Auth.css";
import {useNavigate} from 'react-router-dom'

 const Login=({setUser})=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleLogin = () => {
    if (email && password) {
      fetch('http://localhost:8080/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  email, password})

      }).then(response=>response.json()
      ).then((data)=>{
        console.log(data)
        if(data.name&&data.email&&data._id){
          console.log(data)
          console.log(data.message)
          setUser(data)
          setMessage("Login successful! 🎉");
         setEmail("");
         setPassword("");
         navigate('/account',{state:data})
        }else{
          setMessage("Incorrect Password or Username/Email");
        }
       
      })
      .catch((Error)=>{
     console.log('Error Occured',Error)
      })
      
    } else {
      setMessage("Please fill in all fields.");
    }
    
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleLogin} className="auth-button">
        Login
      </button>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
export default Login; 
