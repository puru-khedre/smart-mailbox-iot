const express = require("express")
const app = express();

app.get("/api/ping", (req,res)=>{
    res.json({success: true});
})


app.listen(3000, ()=>{
    console.log("server started")
})