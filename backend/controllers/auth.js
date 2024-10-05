const {User}=require("../models/user.js");
const bcryptjs=require("bcryptjs");
let signup=async(req,res)=>{
    res.send("signup route");
 }
let login=async(req,res)=>{
    res.send("login route");
 }
 let logout=async(req,res)=>{
    res.send("logout route");
 }
module.exports={signup,login,logout};