const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RentSchema = new Schema({
    roomId: String,
    userId: Number,
    startDate: Date,
    endDate: Date,
    price: Number,
    totalPrice: Number
})

module.exports = mongoose.model('rent', RentSchema)