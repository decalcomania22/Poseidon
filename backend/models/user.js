const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: false,  // Will be null for users authenticating via Google
      },
    //   email: {
    //     type: String,
    //     required:false,
    //     sparse: true, 
    //   },
      password: {
        type: String,
        required: false,  // Will be null for users authenticating via Google
        sparse:true,
      },
      googleId: {
        type: String,
        required: false,  // For Google OAuth users
        sparse:true,
      },
      isverified:{
        type:Boolean,
        default:false,
      }
},{timestamps:true});
////timestamps in mongoose automatically add 
//createdAt and updatedAt fields to your schema, 
//which store the document's creation time and 
//last modification time 
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);