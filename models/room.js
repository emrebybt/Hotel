const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RoomSchema = new Schema({
    category: String,
    bed: Number,
    price: Number,
    bathroom: String,
    isAvaible: Boolean,
    rents: [{
        type: Schema.Types.ObjectId,
        ref: 'rent'
    }]
})

module.exports = mongoose.model('room', RoomSchema)