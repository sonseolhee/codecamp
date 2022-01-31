import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    
    token: String,
    phone: String,
    isAuth: String
    
})


export const Token = mongoose.model("Token", tokenSchema)