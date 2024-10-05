const mongoose=require("mongoose");
const emailverify=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    expires:{
        type:Date,
        required:true,
    }
},{timestamps:true});
////timestamps in mongoose automatically add 
//createdAt and updatedAt fields to your schema, 
//which store the document's creation time and 
//last modification time 
module.exports=mongoose.model("Emailverify",emailverify);