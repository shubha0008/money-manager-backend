const express = require("express");
const app = express();
const bodyParser = require ("body-parser")
const cors = require("cors");
var mongodb = require('mongodb');
const dotEnv = require("dotenv")
const url ="mongodb+srv://admin123:admin123@cluster0.w2u8k.mongodb.net/money-manager-app?retryWrites=true&w=majority";
//const url = process.env.DB;
console.log(url);
app.use(bodyParser.json());  
app.use(cors());

app.get("/transactions",async (req,res) => {
    try {
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = client.db("money-manager-app")
        let data = await db.collection("transaction").find().toArray();
        await client.close();
        res.json(data);
        console.log(data);
    }catch(error) {
        res.status(500).json({
           message: "Something went wrong!",
        })
    }
})

app.post("/transaction", async (req,res) => {
    try{
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = await client.db("money-manager-app")
        let data=await db.collection("transaction").insertOne(req.body);
        console.log(req.body);
        await client.close()
           
        res.json({
            message:"success",
        })
    

    }
    catch (error){
        console.log(error)
    }
})

app.delete("/transactions", async (req,res) => {
    try{
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = await client.db("money-manager-app")
        let data=await db.collection("transaction").deleteOne(req.body);
        console.log(req.body);
        await client.close()
           
        res.json({
            message:"success",
        })
    

    }
    catch (error){
        console.log(error)
    }
})

app.listen(process.env.PORT || 4050, function (req,res) {
    console.log("Server Listening");
})