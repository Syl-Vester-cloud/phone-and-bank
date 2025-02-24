
import http from "http";
import MongoDB from './db.js'
import AppointmentsModel from "./Model/AppointmentsModel.js";
import AccountModel from './Model/AccountModel.js'
import SendMail from "./SendMail.js";

MongoDB();
const server = http.createServer((req, res) => {
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
       let {name,email,password}=user;
      let newUser= await AccountModel.create({name,email,password})
      // let existingUser=AccountModel.findOne({thisemail})
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
                console.log(user,'this user')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({name,email,_id}))
           
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

server.on('error',(error)=>{
console.log(error.message)
})
server.listen(8080, () => {
    console.log('Server running on port 8080');
});

