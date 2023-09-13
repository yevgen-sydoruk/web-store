const { Schema, model } = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const DeviceSchema = new Schema({
  //   id: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: [true, "Device MUST have a name."] },
  price: { type: String, required: true },
  rating: { type: String, default: 0 },
  brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  typeId: { type: Schema.Types.ObjectId, ref: "Type" },
  // info: [{ type: Schema.Types.ObjectId, ref: "DeviceInfo" }],
  img: { type: String, required: true },
  info: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],
});
DeviceSchema.plugin(mongoosePaginate);

module.exports = model("Device", DeviceSchema, "devices");
