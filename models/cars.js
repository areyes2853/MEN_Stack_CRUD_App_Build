// models/fruit.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: String,
    model: String,
    color: String,
    isCarReadytoBeSold: Boolean,
  });

  const carsModel = mongoose.model("carModels", carSchema);

  module.exports = carsModel;