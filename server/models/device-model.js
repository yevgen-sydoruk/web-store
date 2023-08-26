const { Schema, model } = require("mongoose");

const DeviceSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
});

module.exports = model("Device", DeviceSchema);
