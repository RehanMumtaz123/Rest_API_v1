const mongoose=require('mongoose');

const Schema = mongoose.Schema
const userSchema=new Schema({
    name:{type:String, required:true },
    email:{type:String, required:true },
    password:{type:String, required:true }
},{timestamps:true});

const user=mongoose.model('User',userSchema) // 1st param should be singular it will auto creates table with name articles

module.exports=user;