import mongoose from 'mongoose'

// schema 상속 ? subDocument??
// const ogSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     image: String
// })

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    personal: String,
    prefer: String,
    pwd: String,
    phone: String,
    og: Object
})

export const User = mongoose.model('User', userSchema )