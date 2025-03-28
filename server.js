// server.js

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const carModel = require("./models/cars.js");
//lest us accept form
app.use(express.urlencoded({ extended: false }));


app.listen(3001, () => {
  console.log("Listening on port 3001");
});



//server.js
//get /
app.get("/", async (req,res)=>{
    res.render("index.ejs")
});

// server.js

// POST /fruits
app.post("/cars", async (req, res) => {
    console.log(req.body);
    if(req.body.isCarReadytoBeSold)
    {req.body.isCarReadytoBeSold = true}
    else{
        req.body.isCarReadytoBeSold=false;}
    // res.send(req.body)
    await carModel.create(req.body)
    res.redirect("/cars/new");
  });
  

// GET /fruits/new
app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
  });
  