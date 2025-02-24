
import dotenv from "dotenv"// Load .env variables
import mongoose, { connect } from "mongoose"

dotenv.config()
console.log("MongoDB URI:", process.env.MONGO_URI);
 const MongoDB = () => {connect(process.env.MONGO_URI)
         .then(()=>{
            console.log("✅ MongoDB Connected!");
         }).catch((err)=>{
         console.log('Moongose Error',err)
         })
       
   
};

export default MongoDB;
