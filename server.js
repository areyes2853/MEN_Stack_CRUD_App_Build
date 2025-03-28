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

app.listen(3001, () => {
  console.log("Listening on port 3001");
});



//server.js
//get /
app.get("/", async (req,res)=>{
    res.render("index.ejs")
});