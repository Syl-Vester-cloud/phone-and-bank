
    import { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
    import { useNavigate } from "react-router-dom";
    import '../design/Account.css'
    
    const Account = ({handleLogout}) => {
        console.log('User Account Dashboard')
        const [thisUser,setUSer]=useState(null)
        const location = useLocation();
        let nagigate=useNavigate()
        
        let user=location.state
        console.log(user,'User Account from login')
        // Logout function
      let handleLogoutAndRedirect=()=>{
           
            handleLogout();
            nagigate("/")
        }
        return (
            
        <div className="account-container">
        <div className="account-card">
            {user ? (
                <>
                    <div className="profile">
                        <img
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=`} 
                            alt="User Avatar"
                            className="avatar"
                        />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>

                    <button className="logout-btn" onClick={handleLogoutAndRedirect}>Logout</button>
                </>
            ) : (
                <p>Loading account information...</p>
            )}
        </div>
    </div>
);
    };
    
    

export default Account;