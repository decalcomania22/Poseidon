const mongoose=require("mongoose");
const newpass=new mongoose.Schema({
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
    },
    newpass:{
        type:String,
        required:true,
    }
},{timestamps:true});
////timestamps in mongoose automatically add 
//createdAt and updatedAt fields to your schema, 
//which store the document's creation time and 
//last modification time 
module.exports=mongoose.model("Newpass",newpass);