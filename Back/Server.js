
import http from "http";
import MongoDB from './db.js'
import AppointmentsModel from "./Model/AppointmentsModel.js";
import AccountModel from './Model/AccountModel.js'
import SendMail from "./SendMail.js";
import ProductModel from "./Model/ProductModel.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken"
import TokenModel from "./Model/TokenModel.js";


MongoDB();
const server = http.createServer(async (req, res)  => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/bookappointment' && req.method === 'POST') {
    
        let payload=''
        let appointment=''
        req.on('data',chunk=>{
            payload=chunk.toString()
        })
        req.on('end', async () => {
          const data = JSON.parse(payload);  //Convert string to JSON
          const {name,phone,date,time}=data;
         appointment= await AppointmentsModel.create({name,phone,date,time})
            console.log(appointment,'database object')
            /*Checking if the new appointment has been saved to the 
            database and sending the response back to the client.
            */
            if(appointment){
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Data received successfully", received: JSON.stringify(appointment)}));
                //Trying to send a confirmation message through whatsup or email.
            SendMail('sylvestermail10@gmail.com',' Appointment','will be happy to se you')
            }
          
        });
    } 

   
     // Creating a new user to our system
    else if (req.url.startsWith('/signup') && req.method === 'POST') {
        let payload=''

        req.on("data", chunk => (
            
            payload += chunk.toString()
        
        ));

  // Process full body when received
    req.on("end", async() => {
        let user=JSON.parse(payload)
       console.log('registeruing user',user.email)
       let {name,email,password,number}=user;
      let newUser= await AccountModel.create({name,email,password,number})
       let existingUser=AccountModel.findOne({thisemail})
       console.log(newUser,'the user from the db')
       
    if (existingUser) {
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: true}));
    }else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: false}));
    }
   // const { email, password } = req.body;
        
    const hashedPassword =  bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: "User registered successfully!" });
          

  });
        
    }

    ///Admin Url
    else if (req.url.startsWith('/admin') && req.method === 'POST'){
        


    }
    else if (req.url.startsWith('/addProduct') && req.method === 'POST'){
        let  payload='';
        console.log("request made...")
        
        req.on("data",chunk=>(
        payload+=chunk.toString()
        )
    )
    req.on("end",async()=>{
     let data= JSON.parse(payload)
    
     const {image,productName,price,quantity}=data;
     let products=await ProductModel.create({image,productName,price,quantity})
     if(products){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
     }
     else{
        console.log("there was an error")
     }
     
        //console.log(payload,"data completeley done")
    })


    }
    ///Request to get the product for the admin
    else if (req.url.startsWith('/adminProduct') && req.method === 'GET') {
        console.log("Fetching products...");
    
        try {
            // Fetch all products from the database
            const products = await ProductModel.find();
    
            // Send the response with the retrieved products
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        } catch (error) {
            console.error("Error fetching products:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ STOCK: products}));
        }
    }
    //Admin to delete the product
    else if (req.url.startsWith('/adminDelete') && req.method === 'DELETE') {
        console.log("deleting  product...");
    
        try {
            // Fetch all products from the database
            req.on("data",chunk=>{
          let payload =chunk

            })
            req.on("end",async()=>{
                const urlParts = req.url.split('/');
                if (urlParts[1] === 'adminDelete' && urlParts[2]) {
                    const id = urlParts[2]; 
                 console.log(id,'the extracted id....')
                const deleted = await ProductModel.deleteOne({_id:new ObjectId(id)});
               
                console.log(deleted.deletedCount,"count")
                if(deleted.deletedCount==1){
                    const products=await ProductModel.find()
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(products));
                }
                else{
                    console.log("There was an error")
                }
                
                }
            })
            
            
    
            // Send the response with the retrieved products
            
        } catch (error) {
            console.error("Error fetching products:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ STOCK: products}));
        }
    }
    ///Request to get a list of phones for clients
    else if (req.url.startsWith('/phones') && req.method === 'GET') {
        console.log("Fetching products...");
    
        try {
            // Fetch all products from the database
            const products = await ProductModel.find();
    
            // Send the response with the retrieved products
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        } catch (error) {
            console.error("Error fetching products:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Error fetching products" }));
        }
    }
    
   ///Login in the user

    else if (req.url.startsWith('/login') && req.method === 'POST') {
        
        let payload=''
        
         req.on("data", chunk => (
            
            payload += chunk.toString()
        
        ));
        req.on('end',async()=>{
            let requestUser=JSON.parse(payload)
            let email=requestUser.email
            let existingUser=await AccountModel.findOne({email})
            if(existingUser){
                const {name,email,_id}=existingUser
                let user=JSON.stringify({name,email,_id})
                console.log(user,'this user',existingUser)
                let userId=JSON.parse(user)
                let user_id=userId._id
                console.log(user_id,'id extrcee')
         const token = jwt.sign({ id: user._id, name }, String(process.env.SECRET_KEY), { expiresIn: '1h' });
            let token__model= await TokenModel.create({user_id,token})
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({name,email,_id,token}))
           
            }
            else{
                res.writeHead(404, { 'Content-Type': 'application/json' })
               res.end( JSON.stringify({ message: false,user:'user dosent exist'}))
               
            }
            ///Handle after data is done 
        })
    } 

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }
});
////Auth tokens 
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  
    return { accessToken, refreshToken };
  };
  const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
  };

 
server.on('error',(error)=>{
console.log(error.message)
})
console.log('JWT Secret Key:', process.env.JWT_SECRET);
server.listen(8080, () => {
    console.log('Server running on port 8080');

});

