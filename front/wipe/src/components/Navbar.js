import '../design/Navbar.css'
import { useState } from "react";
import { Link } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';

const Navbar=({ user })=>{

    const [isOpen, setIsOpen] = useState(false);
    const AccountIcon = ({ size = "large", color = "primary" }) => {
      return <AccountCircleIcon fontSize={size} color={color} />;
    };

    console.log(user,'user in navbar')
    let navigate=useNavigate()
    let accountButton=()=>{
      navigate('/account',{state:user})
    }
  
    return (
      <nav className="navbar">
        {user?(
         
            <>
          <h1>Swipe</h1>
          <AccountCircleIcon onClick={accountButton} ></AccountCircleIcon>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            ☰
          </button>

          <div className={isOpen ? "nav-links open" : "nav-links"}>
            <Link onClick={() => setIsOpen(false)}to='/'>Home</Link>
            < Link onClick={() => setIsOpen(false)} to="/phoneList">Phones</Link>
           <Link  onClick={() => setIsOpen(false)}to='/wallet'>Wallet</Link>
           <Link onClick={() => setIsOpen(false)} to="/createAppointment">Make Appointment</Link>
           
        </div>
        
        </>
          
          
        ):(
          <>
          <h1>Swipe</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            ☰
          </button>
          <div className={isOpen ? "nav-links open" : "nav-links"}>
            <Link to='/' onClick={() => setIsOpen(false)}>Home</Link>
            < Link onClick={() => setIsOpen(false)}to="/phoneList">Phones</Link>
            <Link onClick={() => setIsOpen(false)} to="/createAppointment">Make Appointment</Link>
            <Link onClick={() => setIsOpen(false)} to='/signup'>SignUp</Link>
            <Link onClick={() => setIsOpen(false)} to='/Login'>Log In</Link>
        </div>
        </>)}
      </nav>
    );

  
}
export default Navbar