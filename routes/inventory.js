const express = require('express');
const inventory = express.Router();
const Inventory = require("../models/Inventory");

inventory.post("/additem",(req,res)=>{
    console.log("Reached post route")
    const inventoryProduct = new Inventory({
        meal:req.body.meal,
        price:req.body.price,
        quantity:req.body.quantity,
        url:req.body.url,
        info:req.body.info,
        ayurvedic:req.body.ayurvedic
    })
    try{
        const successInventory = inventoryProduct.save()
        res.sendStatus(200);
    }
    catch{
        res.sendStatus(500);
    }
})

inventory.post("/getlist",(req,res)=>{
    const viewInventory = Inventory.updateMany({ayurvedic:false},(err,result)=>{
        if(err){
            res.status(501).send("An error occured in the server")
        }
        else{
            res.send(result)
        }
    })
})

inventory.get("/getlist",(req,res)=>{
    
    if(req.query.ayurvedic){
        const viewInventory = Inventory.find({ayurvedic:true},(err,result)=>{
            if(err){
                res.status(501).send("An error occured in the server now")
            }
            else{
                res.send(result)
            }
        })
    }
    else{ const viewInventory = Inventory.find({ayurvedic:false},(err,result)=>{
        if(err){
            console.log(err);
            console.log("This is an error")

        }
        else{
            res.send(result);
        }
    })}
   
})

module.exports = inventory;