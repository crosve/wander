const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const supabase = require("../config/supabase");

const { db } = require("../config/mongodb");

require("dotenv").config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
