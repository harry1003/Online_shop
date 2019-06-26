const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const userSchema = new Schema({
    userName: {type:String, required:[true, "userName is required"]},
    password: {type:String, required:[true, "password is required"]},
    firstName: String,
    lastName: String,
    phone: String,
    gender: String
})

 module.exports = mongoose.model('user', userSchema);
