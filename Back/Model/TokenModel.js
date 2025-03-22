import mongoose from "mongoose";

const AuthToken=new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountModel', // Reference to the User model
        required: true
    },
    token: {
        type: String,
        required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})
const TokenModel=mongoose.model('AuthToken',AuthToken)
export default TokenModel;