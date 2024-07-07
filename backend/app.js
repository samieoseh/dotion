/* eslint-disable no-undef */
const express = require('express')
const cors = require('cors');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const pageRoutes = require("./routes/page");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

// To parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// To parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

dotenv.config();

// eslint-disable-next-line no-undef
const source = process.env.DATABASE_CONNECTION;



mongoose.connect(source, {
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
});

const port = 8080;

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/page", pageRoutes);

app.listen(port, () => {
  console.log(`Listening on port:  ${port}`);
});
