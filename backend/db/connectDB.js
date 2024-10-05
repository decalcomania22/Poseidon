const mongoose=require("mongoose");

module.exports= async()=>{
 try{
    await mongoose.connect('mongodb://127.0.0.1:27017/notiit');
 }catch(err){
    console.log("err connection to database",err.message);
 }   
}