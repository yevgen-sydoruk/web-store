const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
});

module.exports = model("User", UserSchema, "users");
