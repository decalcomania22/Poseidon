 const express=require("express");
 const router=express.Router();
 const User=require("../models/user.js");
 router.use(express.urlencoded({extended:true}));
router.use(express.json());
const session=require("express-session");
const sessionOptions={
    secret:"mydreamspicebid",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
      }
};
router.use(session(sessionOptions));
const passport=require("passport");
const LocalStrategy=require("passport-local");
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 router.get("/signup",(req,res)=>{
    res.render("signup.ejs");
 });
 router.post("/signup",async(req,res)=>{
    const {email,password,name}=req.body;
    const checkduplicate=await User.findOne({email});
    if(checkduplicate){
        res.send("duplicate user");
    }else{
        const newuser=new User({
            email:email,
            password:password,
            name:name
        });
        await newuser.save();
        console.log(newuser);
    }
 })
 router.get("/login",(req,res)=>{
    res.render("login.ejs");
 })
 router.post("/login",passport.authenticate("local",{failureRedirect:"/login"}),(req,res)=>{
    res.send("login done");
 });
 router.get("/logout",(req,res)=>{
    res.send('logout');
 });

 module.exports=router;