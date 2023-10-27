const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RoomSchema = new Schema({
    category: String,
    bed: Number,
    price: String,
    bathroom: String,
    isAvaible: Boolean,
    
})

module.exports = mongoose.model('room', RoomSchema)