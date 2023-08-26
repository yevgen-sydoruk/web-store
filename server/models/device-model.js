const { Schema, model } = require("mongoose");

const DeviceSchema = new Schema({
  //   id: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  price: { type: String, required: true },
  rating: { type: String, default: 0 },
  brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  typeId: { type: Schema.Types.ObjectId, ref: "Type" },
  img: { type: String, required: true },
});

module.exports = model("Device", DeviceSchema, "devices");
