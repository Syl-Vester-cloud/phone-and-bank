
import { useState } from "react";
import "../design/Auth.css";

const SignUp=()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    console.log('Signin up')
    if (name && email && password) {
      fetch('http://localhost:8080/signup',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password})

      }).then((response)=>{
        console.log(response,'Signed up')
        }
      ).catch((Error)=>{
     console.log('Error Occured',Error)
      })
      setMessage("Account created successfully! 🎉");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="auth-input"
      />
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
       <input
        type="password"
        placeholder="confirm Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleSignup} className="auth-button">
        Sign Up
      </button>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
export default SignUp;