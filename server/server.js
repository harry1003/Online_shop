const API_PORT = 3001;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
app.listen(API_PORT, () => console.log(`SERVER LISTENING ON PORT ${API_PORT}`));