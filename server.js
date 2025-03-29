// server.js

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // new
const morgan = require("morgan");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const carModel = require("./models/cars.js");
//lest us accept form
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


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
    res.redirect("/cars");
  });
  

// GET /fruits/new
app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
  });
  
  
  app.get("/cars/:carId", async (req, res) => {
    const foundCars = await carModel.findById(req.params.carId)
    res.render("cars/show.ejs",{cars: foundCars});
  });
  
  
  app.get("/cars",async (req,res)=>{
    const allCars = await carModel.find();
    console.log(allCars)
    res.render("cars/index.ejs",{cars:allCars})
    // res.send("welcome to the index page!")

  })

  app.delete("/cars/:carId", async (req, res) => {
    await carModel.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
  });
  
  // GET localhost:3000/fruits/:fruitId/edit
app.get("/cars/:carId/edit", async (req, res) => {
    const foundCar = await carModel.findById(req.params.carId);
    console.log(foundCar);
    res.render("cars/edit.ejs", {
        car: foundCar,
      });
  });
  

  app.put("/cars/:carId", async (req, res) => {
    if(req.body.isCarReadytoBeSold){
        req.body.isCarReadytoBeSold = true;
    }
    else{
        req.body.isCarReadytoBeSold =false
    }
     // Update the car in the database
  await carModel.findByIdAndUpdate(req.params.carId, req.body);

  // Redirect to the car's show page to see the updates
  res.redirect(`/cars/${req.params.carId}`);
  });
  