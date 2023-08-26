const { Schema, model } = require("mongoose");

const DeviceInfoSchema = new Schema({
  //   id: { type: Number, unique: true, required: true },
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
});

module.exports = model("Device", DeviceInfoSchema);
