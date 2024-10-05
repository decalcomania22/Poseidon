const express=require("express");
const app=express();
const cors = require("cors");
app.use(
    cors({
      origin: "http://localhost:5173", // Change to your frontend URL
      methods: 'GET,POST,PUT,DELETE', 
      credentials: true,
    })
  );
//   app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow specific origin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
//     res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
//     next();
//   });
const connectDB=require("./db/connectDB.js");
const dotenv=require("dotenv");
dotenv.config();
// const authroutes=require("./routes/authRoute.js");
// app.use("/api/auth",authroutes);
app.set("view engine","ejs");
const path=require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
const User=require("./models/user.js");
const Emailverify=require("./models/verifyemail.js");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
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
app.use(session(sessionOptions));
const passport=require("passport");
const LocalStrategy=require("passport-local");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
///////////////nodemailer
const randomotpgen=()=>{
    return Math.floor(1000 + Math.random() * 9000);
}
// let randompin;
const nodeMailer=require('nodemailer');
const generateverifyemail=require("./utils/generateverifyemail.js");
const generatepassverify=require("./utils/newpassverify.js");
// const emails=[];
// let html;

// main()
// .catch(e=>console.log(e));
////////////////
//////google auth
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log("aayi");
    // User.findOrCreate({ googleId: profile.id,email: profile.email,
    //     name: profile.name, }, function (err, user) {
    //     return cb(err, user);
    //   });
      let user = await User.findOne({ googleId: profile.id });
    console.log(profile);
      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({
            googleId: profile.id,
            username: profile._json.email,
            name: profile.displayName,
        });
        // emails.push(profile._json.email);
        // let randompin=randomotpgen();
        // let verifyuser=new emailVerify({
        //     email:profile._json.email,
        //     otp:randompin,
        //     expires:Date.now()+10*60*1000,
        // });
        // html=`
        //     <h1>Hello User</h1>
        //     <p>${randompin}</p>
        //     `;
        // await verifyuser.save();
        await user.save();
        
        // console.log(verifyuser);
        // Continue the authentication process
        // return cb(null, { user, verifyuserId: verifyuserid });
      }
      let verifyuserid=await generateverifyemail(profile._json.email,false);
      return cb(null, { user, verifyuserId: verifyuserid });
  }
));
// async function main(){
//     const transporter=nodeMailer.createTransport({
//         host:'smtp.gmail.com',
//         port:587,
//         secure:false,
//         auth:{
//             user:'rajnesh34698@gmail.com',
//             pass:'wafz ljlw awnb fsdl'/////ye google app passwords se pata kiya , firstly turn on two step verifiction on your google account then you will be able to do this
//         }
//     });
//     const info=await transporter.sendMail({
//         from:'"Rajnesh" <rajnesh34698@gmail.com>',
//         to:emails,
//         subject:'very urgent',
//         html:html,
//     });
//     console.log("Message sent"+info.messageId);
//     console.log(info.accepted);
//     console.log(info.rejected);
// }
////
/////
///////////////linkedin-auth

/////////////////
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((obj, done) => {
    done(null, { userId: obj.user._id, verifyuserId: obj.verifyuserId });  // Save the user ID in the session
});

passport.deserializeUser(async (sessionData, done) => {
    try {
        const user = await User.findById(sessionData.userId);  // Find user by the stored ID
        done(null, { ...user.toObject(), verifyuserId: sessionData.verifyuserId });
    } catch (err) {
        done(err, null);
    }
});
// app.get("/signup",(req,res)=>{
//    res.render("signup.ejs");
// });

//////////////google auth routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'] }));
app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        async function(req, res) {
            console.log("again",req.user);
        res.redirect(`http://localhost:5173/otp/${req.user.verifyuserId}`);////ejs se render karne ke  liye pahle likha tha
        // res.status(201).json({verifyuserid:req.user.verifyuserId,message:"registered but email verification remaining"});
    });
//////////////////////////////////
///////////////linkedin auth routes

///////////////////////////


app.post("/signup",async(req,res)=>{
    console.log("aaya");
   const {username,password,name}=req.body;
   const checkduplicate=await User.findOne({username});
   if(checkduplicate){
    //    res.send("duplicate user");
    res.status(201).json({message:"duplicate User",isduplicate:true});
   }else{
       const newuser=new User({
           username:username,
           name:name
       });
       await User.register(newuser,password);

       console.log(newuser);
       let verifyuserid=await generateverifyemail(username,false);
       res.status(201).json({message:"User registered but not verified",verifyuserid:verifyuserid,isduplicate:false});
    //    res.redirect(`/${verifyuserid}/emailverification`);
   }
})
app.get("/login",(req,res)=>{
    console.log(req.session);
   res.render("login.ejs");
})
app.post("/login",passport.authenticate("local",{failureRedirect:"/login"}),async(req,res)=>{
    console.log(req.body);
    const{username}=req.body.username;
    // let user=await User.findById(id);
    let verifyuserid=await generateverifyemail(username,false);
    res.redirect(`/${verifyuserid}/emailverification`);
//    res.send("login done");
});
app.get("/logout",(req,res)=>{
    console.log(req.user);
    console.log(req.user);
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        console.log(req.user);
        res.send("logout done");
    });
});
app.get("/:id/emailverification",(req,res)=>{
    const {id}=req.params;
    res.render("emailverification.ejs",{id});
});
app.post("/:id/emailverification",async(req,res)=>{
    const {tempotp}=req.body;
    const {id}=req.params;
    console.log(id);
    const {email,otp,expires}=await Emailverify.findById(id);
    if(Date.now()>expires){
        console.log("time exceeded");
        await Emailverify.findByIdAndDelete(id);
        let newidforverify=await generateverifyemail(email,false);
        // return res.redirect(`/${newidforverify}/emailverification`);
    }
    if(tempotp==otp){
        console.log("verified");
        const updated = await User.updateOne(
            { username: email }, // Query to find the user by username
            { $set: { isverified: true } } // Update operation
          );
        console.log(updated);
        await Emailverify.findByIdAndDelete(id);
        res.status(201).json({redirecturl: "http://localhost:5173"});
    }else{
        console.log(tempotp);
        console.log(otp);
        console.log("wrong otp plz reverify");
        // await generateverifyemail(email,true);
        // return res.redirect(`/${id}/emailverification`);
    }
});
app.get("/:id/updatepass",(req,res)=>{
    const verifyuserid=generateverifyemail(email,false);
    res.status(201).json({verifyuserid:verifyuserid});
})
app.post("/:id/updatepass",async(req,res)=>{
    const {id}=req.params;
    const {newpass}=req.body;
    const {email,otp,expires}=await Emailverify.findById(id);
    if(Date.now()>expires){
        console.log("time exceeded");
        await Emailverify.findByIdAndDelete(id);
        let newidforverify=await generateverifyemail(email,false);
        // return res.redirect(`/${newidforverify}/emailverification`);
    }
    if(tempotp==otp){
        console.log("verified");
        const updated = await User.updateOne(
            { username: email }, // Query to find the user by username
            { $set: { password: newpass } } // Update operation
          );
        console.log(updated);
        await Emailverify.findByIdAndDelete(id);
        res.status(201).json({redirecturl: "http://localhost:5173"});
    }else{
        console.log(tempotp);
        console.log(otp);
        console.log("wrong otp plz reverify");
        // await generateverifyemail(email,true);
        // return res.redirect(`/${id}/emailverification`);
    }
})
let mainuser;
app.use((req, res, next) => {
    mainuser=req.user;
    console.log('Middleware running');
    next(); // Always call next() to move to the next middleware
});
app.get("/",(req,res)=>{
    console.log(req.session);
    console.log(req.user);
    res.send("very nice");
        // res.status(201).json(req.user);
})
app.listen(3000,()=>{
    connectDB();
    console.log("server is running on port");
})