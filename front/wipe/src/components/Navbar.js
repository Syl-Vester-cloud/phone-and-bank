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
          <h1>Phone Repair Service</h1>
          <AccountCircleIcon onClick={accountButton} ></AccountCircleIcon>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            ☰
          </button>

          <div className={isOpen ? "nav-links open" : "nav-links"}>
            <Link to='/'>Home</Link>
            < Link to="/phoneList">Phones</Link>
           <Link to='/wallet'>Wallet</Link>
           <Link to="/createAppointment">Make Appointment</Link>
           
        </div>
        
        </>
          
          
        ):(
          <>
          <h1>Phone Repair Service</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            ☰
          </button>
          <div className={isOpen ? "nav-links open" : "nav-links"}>
            <Link to='/'>Home</Link>
            < Link to="/phoneList">Phones</Link>
            <Link to="/createAppointment">Make Appointment</Link>
            
            <Link to='/signup'>SignUp</Link>
            <Link to='/Login'>Log In</Link>
        </div>
        </>)}
      </nav>
    );

  
}
export default Navbar