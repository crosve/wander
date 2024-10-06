const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const { encrypt, decrypt } = require("../functions/encrypt");
const { db } = require("../config/mongodb");
const uploadImageRouter = require('./routes/uploadImage.js');

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/uploadImage", uploadImageRouter);

app.post("/login", async (req, res) => {
  const { user, password } = req.body;

  console.log("params being passed", user, password);

  try {
    const database = await db();
    const usersCollection = database.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ username: user }, { email: user }],
    });

    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({
        message: "username nor email exist in the database",
      });
    }

    console.log("existing user data: ", existingUser);
    const hashed_password = existingUser.password;

    const correctPassword = await decrypt({
      password: password,
      hashed_password: existingUser.hashed_password,
    });

    const payload = {
      userId: existingUser._id,
      hashed: hashed_password,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    if (correctPassword) {
      return res.status(200).json({
        message: "success",
        jwtToken: token,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

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

    const hashed_password = await encrypt({ password: password });

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

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/userData", authenticateJWT, async (req, res) => {
  // Access the authenticated user data using req.user
  const userData = req.user;

  console.log("user data being sent: ", userData);

  try {
    const database = await db();
    const collection = database.collection("users");
    const userId = new ObjectId(userData.userId);
    const user = await collection.findOne({ _id: userId });
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Protected data accessed",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Something went wrong please try again later",
    });
  }
});

//route requires a comment and the postID inorder to update it's
//comment array
app.post("/updatecomments", async (req, res) => {
  const { comment, postId } = req.body;
  if (!comment || !postId) {
    return res.status(404).json({
      message: "no comment was provided",
    });
  }

  try {
    const database = await db();
    const collections = database.collection("posts");

    const result = await collections.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: {
            description: updateData.comments.description,
            timeCreated: new Date(),
          },
        },
      }
    );

    //make sure the data was modified
    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: "new message inserted",
      });
    } else {
      return res.status(400).json({
        message: "query was not successful",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "and error occured when updating comments",
    });
  }
});

//when this is called we can just increment the likes in the post by one
//we still need the postId to identify what post entry we want to update
app.post("/updateLikes", async (req, res) => {
  const { postId } = req.body;

  try {
    const database = await db();
    const collection = database.collection("posts");

    const result = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $inc: {
          likes: 1, // Increment likes by 1
        },
      }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: "query was successful",
      });
    } else {
      return res.status(500).json({
        message: "error occured when updating number of likes",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "error occured when updating number of likes",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
