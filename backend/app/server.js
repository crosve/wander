const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const supabase = require("../config/supabase");
const { encrypt, decrypt } = require("../functions/encrypt");

const { db } = require("../config/mongodb");

require("dotenv").config();
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/uploadImage", (req, res) => {});

app.post("/signup", async (req, res) => {
  const { username, email, password, tags } = req.body;

  try {
    const database = await db();
    const usersCollection = database.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });

    console.log(existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Either email or username" });
    }

    const hashed_password = encrypt({ password });

    const newUser = {
      username,
      email,
      hashed_password,
      tags,
    };

    const result = await usersCollection.insertOne(newUser);
    console.log(result);

    // if (result.status === 201){
    //   const payload = {username: username, hashed: hashed_password};
    //   const token = jwt.sign(payload, secretKey);

    // }
    const payload = { userId: result.insertedId, hashed: hashed_password };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    res.status(201).json({
      message: "User signed up successfully",
      userId: result.insertedId,
      jwtToken: token,
    });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
