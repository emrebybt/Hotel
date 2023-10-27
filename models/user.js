const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
  surname: {
    type: String,
    required: true,
    },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

module.exports = Mongoose.model("user", UserSchema);