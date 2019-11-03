const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT_SERVER;

// Routes
const authRoute = require("./routes/auth");
const userInfo = require("./routes/user-info");

console.log("\n");
console.log(`Config: Loaded`);
console.log(`Port: ${port}`);

// DB Conect
mongoose.connect(process.env.DB_CONECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }, () =>
	console.log("DB: Connected \n")
);

// Body parser
app.use(express.json());

// Routes use
app.use("/api/", authRoute);
app.use("/api/user/", userInfo);

// Server start
app.listen(port, () => { console.log("Server: Up") });