
import { useRef, useState } from "react";
import "../design/Auth.css";

const SignUp=()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const confirmpassRef=useRef("")
  const passRef=useRef("")
  const [number,setNumber]=useState("")
  const [notmatch,setNotmatch]=useState("")

  const handleSignup = () => {
    console.log('Signin up')
    console.log(number) 
    if (name && email && password&&number) {
      fetch('http://localhost/signup',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password,number})

      }).then((response)=>{
        console.log(response,'Signed up')
        }
      ).catch((Error)=>{
     console.log('Error Occured',Error)
      })
      setMessage("Account created successfully you can now go to LOG IN! 🎉");
      setName("");
      setEmail("");
      setPassword("");
      setNotmatch("")
      setNumber("")
      
    } else {
      setMessage("Please fill in all fields.");
    }
  };
  let passMatch=(e)=>{
    
    
    if(passRef.current.value!==confirmpassRef.current.value){
      setNotmatch("Ooops Passwords do not match")
    }
    else{
      console.log("match")
      setNotmatch("")
    }

  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {message && <p className="auth-message">{message}</p>}
      <small>{notmatch&&<p style={{color:'red'}}>{notmatch}</p>}</small>
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
        value={password} ref={passRef}
        onChange={(e)=>setPassword(e.target.value)}
        className="auth-input"
      />
       <input
        type="password"
        placeholder="confirm Password"
        onChange={passMatch}
        ref={confirmpassRef}
        className="auth-input"
      />
       <input
        type="number"
        placeholder="phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleSignup} className="auth-button">
        Sign Up
      </button>
      
    </div>
  );
}
export default SignUp;