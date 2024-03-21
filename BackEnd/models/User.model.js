const mongoose = require("mongoose")
const {Schema , model} = mongoose

const UserSchema = new Schema({
    name:{type:String , require: true},
    email:{type:String , require: true, trim:true,minLength:3 , unique:true},
    photoURL:{type:String , require: true},
    role:{type:String ,enum:["admin" , "user"] ,default: "user"},
},
    {
    timestamps:true,
    }
)
const UserModel = model("User", UserSchema)
module.exports = UserModel