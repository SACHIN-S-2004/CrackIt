const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fname: {type:String, required: true},
    Lname: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    phone: {type: Number},
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User",userSchema, "users");