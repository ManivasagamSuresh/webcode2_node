const express = require("express");
const app = express()
const mongodb =require('mongodb');
const URL = "mongodb://0.0.0.0:27017"
const mongoclient = new mongodb.MongoClient(URL)
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000"
}))


app.post("/Contacts",async(req,res)=>{
    try {
        const connection =await mongoclient.connect();
        const db = connection.db("webcode2");
        const contact =  await db.collection("contacts").insertOne(req.body);
        await connection.close();
        res.json(contact);

        
    } catch (error) {
        console.log(error);
        res.json({message:"something Went Wrong"});
    }
})



app.post("/Products",async(req,res)=>{
    try {
        const connection =await mongoclient.connect();
        const db = connection.db("webcode2");
        const Products =  await db.collection("products").insertOne(req.body);
        await connection.close();
        res.json(Products);

    
    } catch (error) {
        console.log(error);
        res.json({message:"something Went Wrong"});
    }
})


app.get("/ProductsList",async(req,res)=>{
    try {
        const connection =await mongoclient.connect();
        const db = connection.db("webcode2");
        const Products =  await db.collection("products").find({}).toArray();
        await connection.close();
        res.json(Products);

    
    } catch (error) {
        console.log(error);
        res.json({message:"something Went Wrong"});
    }
})


app.get("/Product/:id",async(req,res)=>{
    try {
        const connection =await mongoclient.connect();
        const db = connection.db("webcode2");
        const Products =  await db.collection("products").findOne({_id:mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(Products);

    
    } catch (error) {
        console.log(error);
        res.json({message:"something Went Wrong"});
    }
})



app.post("/hours/:id",async(req,res)=>{
    try {
        // const connection =await mongoclient.connect();
        // const db = connection.db("webcode2");
        // const Products =  await db.collection("products").findOne({_id:mongodb.ObjectId(req.params.id)});
        // await connection.close();
        console.log(req.body)
        var date1 = new Date(req.body.startDate);
        console.log(req.body.startDate);
        var date2 = new Date(req.body.endDate);
        var hours = (date2-date1)/(1000*3600);
        res.json(hours)
        console.log(hours);



    
    } catch (error) {
        console.log(error);
        res.json({message:"something Went Wrong"});
    }
})


console.log("started")
app.listen(process.env.PORT || 3005);