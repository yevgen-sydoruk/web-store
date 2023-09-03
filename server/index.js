require("dotenv").config();
const express = require("express");
// const sequelize = require("./db"); //For Postgres DB
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandleMiddleware");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//Always must be last (last middleware)
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // await sequelize.authenticate();
    // await sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  } catch (e) {
    console.log(e);
  }
};
start();
