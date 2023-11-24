// import http from "http"
// import gfname,{love} from "./feature.js"
// import fs from "fs";

// const home = fs.readFileSync("./index.html")
// console.log(home)
// console.log(gfname)
// console.log(love())
// const server = http.createServer((req,res)=>{
//     if(req.url==="/"){
//         res.end(home)
//     }
//     else if(req.url==="/about"){
//         res.end(`My name is Anurag and my love is ${love()}`)
//     }
//     else if(req.url==="/contact"){
//         res.end("9821150629")
//     }
//     else{
//         res.end("Page not Found")
//     }
// })
// server.listen(3000,()=>{
//     console.log("chala diya na bette")
// });
import express, { urlencoded } from "express";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";


const app = express();

// const arr = [];

// connecting mongodb compass
const MONGO_URL = "mongodb+srv://anuraganu202016:anurag123@mycluster.ve2qumd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {
    dbName: "backend"
}).then(() => console.log("Database Connected")).catch((e) => console.log(e))

// creating schema

const schema = new mongoose.Schema({
    name: {

        type:String,
        required:true,
    }
,
    email:{
        type:String,
        required:true,
    },
    pass:{
        type:String,
        required:true,
    }
})

const msg = mongoose.model("Message", schema)

// app.use(express.static(path.join(path.resolve(),public)));
app.use(urlencoded({ extended: true }));          // middleware
app.use(cookieParser());                          // middleware

 
app.get("/", (req, res) => {
    

    res.render("signup")

    // const token = req.cookies.token;
    // if (token) {
    //     res.render("logout")
    // }
    // else {
    //     res.render("login")
    // }

});


app.get("/login",(req,res)=>{
    res.render("login")
})


app.get("/logout",(req,res)=>{
    res.render("logout")
})
app.post("/login", async(req, res) => {
    // if(req.body.email=="email@gmail.com"){
    //     res.redirect("/logout")
    // }else{
    //     res.redirect("/")
    // }
    

    // const {email,password} = req.body;
    let {email,passw}=req.body;
    let user = await msg.findOne({email});
    
    
     
    if(!user){
        
        console.log("redirected")
        return res.redirect("/")
         
    }
    if(user.pass!=req.body.password){
        console.log("incorrect password")
        return res.redirect("/login")
    }
    
    res.cookie("token", "Here we go",{
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    })
    res.redirect("/logout")
})

app.post("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.redirect("/")
})

app.set("view engine", "ejs");
app.get("/2", (req, res) => {
    res.render("index", { name: "Anuraj" })
});

app.get("/success", (req, res) => {
    res.render("Success")
})

// app.post("/contact",(req,res)=>{
//     console.log(req.body);
//     arr.push({username:req.body.name,email:req.body.email})
//     res.redirect("/success")
// })

app.post("/register", (req, res) => {
    // res.json({
    //     arr,
    // })
    
    console.log(req.body)

    msg.create({ name: req.body.name, email: req.body.email,pass:req.body.password }).then((data)=>
    {
        console.log("success")
        
        res.redirect("/login")
    }).catch(e=>{
        // res.send("Please fill the form correctly")
        console.log("error")
        res.redirect("/")
    })
    
})

app.listen(3000, () => {
    console.log("Express started")
})