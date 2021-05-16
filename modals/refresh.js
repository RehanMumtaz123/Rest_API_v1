const mongoose=require('mongoose');

const Schema = mongoose.Schema
const refreshSchema=new Schema({
    token:{type:String, required:true },
   },{timestamps:true});

const refresh=mongoose.model('Refresh',refreshSchema) // 1st param should be singular it will auto creates table with name articles

module.exports=refresh;