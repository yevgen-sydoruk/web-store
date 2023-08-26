const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
});

// const User = sequelize.define("user", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   email: { type: DataTypes.STRING, unique: true },
//   password: { type: DataTypes.STRING },
//   role: { type: DataTypes.STRING, defaultValue: "USER" },
// });

module.exports = model("User", UserSchema);
