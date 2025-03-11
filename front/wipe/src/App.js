import Appointments from "./components/Appointments";
import {Routes,BrowserRouter,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from "react";
import PhoneList from "./components/PhoneList";
import Home from "./components/Home";
import Wallet from "./components/Wallet";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Admin from "./components/Admin";
const App = () => { 
    const [user,setUser]=useState(null)
    console.log('app.js',user)
        
    return ( 
        <BrowserRouter>
       <Navbar  user={user} setUser={setUser}/>
         
          <Routes>
    {/* Always accessible route */}
   
    
    <Route index element={<Home />} />
    <Route path="/createAppointment" element={<Appointments />} />
       <Route path="/phoneList" element={<PhoneList />} />
       <Route path="/admin" element={<Admin/>}/>
    {/* Authenticated routes */}
    {user ? (
        <>     
            <Route path="/wallet" element={<Wallet user={user}/>} />
            <Route path="/account" element={<Account user={user}/>} />
        </>
    ) : (
        <>
     
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
        </>
    )}
</Routes>

        
        </BrowserRouter>

 
); }

export default App