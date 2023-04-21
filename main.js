const express = require("express")
const app = express();
let count=0;

app.get("/api/ping", (req,res)=>{
    let {path, ip} = req;
    console.log(count, ". ", path, ip);
    count++;
    res.json({success: true});
})


app.listen(3000, ()=>{
    console.log("server started")
})