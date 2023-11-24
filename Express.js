import Express  from "express";
const app = Express();
app.get("/getter",(req,res)=>{
    res.json({
        success:true,
        product:[]
    })
})