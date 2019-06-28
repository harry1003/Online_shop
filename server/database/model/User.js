const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const userSchema = new Schema({
    userName: {type:String, required:[true, "userName is required"]},
    password: {type:String, required:[true, "password is required"]},
    img: {data: Buffer, contentType: String},
    firstName: {type:String, default:""},
    lastName: {type:String, default:""},
    phone: {type:String, default:""},
    gender: {type:String, default:""},
    history:{type: Array, default:[]}
})

 module.exports = mongoose.model('user', userSchema);
