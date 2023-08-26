const { Schema, model } = require("mongoose");

const RatingSchema = new Schema({
  rate: { type: Number, unique: true, required: true },
});

module.exports = model("Rating", RatingSchema, "ratings");
