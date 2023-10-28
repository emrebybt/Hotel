const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RentSchema = new Schema({
    roomId: String,
    userId: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    adult: Number,
    totalPrice: Number,
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    }
})

module.exports = mongoose.model('rent', RentSchema)