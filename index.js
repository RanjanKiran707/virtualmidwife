

const express = require('express');
const nodeCron = require('node-cron');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User')
const auth = require('./routes/auth');
const exercise = require('./routes/exercise');
const forum = require('./routes/forum');
const inventory = require('./routes/inventory');
const orders = require('./routes/orders');
const userinfo = require('./routes/userinfo');
const cookieParser = require('cookie-parser');
const diet = require('./routes/diet');
const {ocrSpace}=require('ocr-space-api-wrapper');
const fs = require('fs')
const path = require('path')
const requestmod= require("request");
const multer = require('multer');
const { request } = require('http');
const upload = multer({})
var number = 4

const port = process.env.PORT||4000
 mongoose.connect('mongodb+srv://Pratap11:QY6we3pEfj5uvlDe@cluster0.oejn7.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true 
}).then(()=>{
    console.log("Mongo connection successful!")
}).catch(()=>{
    console.log("Error in connecting to the database! and going")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/viewusers",async (req,res)=>{
    const user = User.findOne({name:"Pratap Simha"},(err,userObj)=>{

        if(err){
            console.log("The error is-"+err)
        }
        else{
            console.log(userObj)
        }
        
    });
    
})



const handleUpload = async (req,res,next)=>{
    
    number +=1;
    const tmp = await fs.writeFileSync(
        path.join(__dirname, `./reports/test.pdf`),
        req.files[0].buffer)
        try{
            var res1 = await ocrSpace(`./reports/test.pdf`, {apiKey:'K87663152988957'})
            res1 = res1.ParsedResults[0].ParsedText;
            var newstring = res1.split(" ").join("");
            newstring=newstring.replace(/(\r\n|\n|\r)/gm, "");
            console.log(newstring)

            // https.get(`https://dry-coast-77112.herokuapp.com/?info=${newstring}`,(resp,err)=>{
            //     if(err){
            //         console.log(err)
            //     }
            //     else{
            //         console.log(resp)
            //     }
                
            // })
            requestmod(`https://dry-coast-77112.herokuapp.com/?info=${newstring}`,(err,res,body)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(body)
                }
            })

        }
        catch{
            console.log("Error");
        }
    // const upl = fs.writeFileSync(path.join(__dirname, '/test.pdf'), file);
    // res.send("file has been uploaded");
}


app.use("/auth", auth);
app.use("/details",userinfo);
app.use("/inventory",inventory);
app.use("/exercises",exercise);
app.use("/order",orders)
app.use("/forum",forum);
app.use("/diet",diet);

app.get("/",(req,res)=>{
    res.send(`You have reached the server for HackBites TEMP team.`)
})
app.post("/adduser",async (req,res)=>{
    const user = new User({
         name:"Pratap Simha",
         age:21
    })
    try{
         const successUser = await user.save();
         res.send("Success in adding the user!")  
    }
    catch(err){
        console.log("Error in adding new users!")
    }
})   

// app.post("/getocr",async (req,res)=>{
    // try{
    //     const res1 = await ocrSpace('./sample.pdf', {apiKey:'K87663152988957'})
    //     console.log(res1)
    // }
    // catch{
    //     console.log("Error");
    // }
// })

app.post("/fileupload",upload.any(),handleUpload)

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Server has started")
    }

})