const express = require('express');
const User = require('../models/User');
const Diet = require('../models/Diet')
const diet = express.Router();
const nodeCron=require('node-cron');
diet.get("/addgoodies",(req,res)=>{
    const finduser = User.findOneAndUpdate({email:req.query.email},{$inc:{goodies:5}},(err,result)=>{
        if(err){
            res.status(501).send("An error occured");
        }
        else{
            console.log(result.goodies)
            if(result.goodies>=20){
                console.log(result.goodies)
                const decuser = User.findOneAndUpdate({email:req.query.email},{$inc:{goodies:-20}},(err,data)=>{
                    if(err){
                        res.status(502).send("An error occured");
                    }
                    else{
                        res.status(200).send("You can now treat yourself! Have something from our secret desserts section!")
                    }
                })
            }
            else{
                res.status(200).send("Goodies is updated");
            }
    
        }
    })
})

diet.get("/start",(req,res)=>{
    const job =nodeCron.schedule("* * */23 * * *",()=>{
        const updateuser = User.findOneAndUpdate({email:req.query.email},{waterIntake:0},(err,response)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Water intake updated")
            }
        })
    })
    res.send("Started")
})

diet.post("/updatewater",(req,res)=>{
    const updatewater = User.findOneAndUpdate({email:req.query.email},{$inc:{waterIntake:req.body.litre}},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.status(200).send("Updated");
        }
    })
})

diet.post("/add",(req,res)=>{
    const plan = Diet.findOne({email:req.body.email},(err,data)=>{
        if(data){
            const updateplan = Diet.updateOne({email:req.body.email},{plan:req.body.plan},(err,result)=>{
                if(err){
                    res.status(501).send("Could not add")
                }
                else{
                    res.status(200).send("Plan")
                }
            })
        }
        else{
            const dietplan = new Diet({
                email:req.body.email,
                plan:req.body.plan
            })
            try{
                const savediet = dietplan.save();
                res.status(200).send("Added the diet plan")
            }
            catch{
                res.status(501).send("Could not add")
            }
        }
    })
    
})

diet.get("/getmealplan",(req,res)=>{
    const mealplan = Diet.findOne({email:req.query.email},(err,result)=>{
        if(err){
            res.status(501).send("Error")
        }
        else{
            res.status(200).send(result);
        }
    })
})

module.exports=diet;