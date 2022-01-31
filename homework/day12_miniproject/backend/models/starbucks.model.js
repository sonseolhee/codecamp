import mongoose from 'mongoose'

const coffeeSchema = new mongoose.Schema({
    name: String,
    img: String
})

export const Starbucks = mongoose.model('Starbucks', coffeeSchema)
