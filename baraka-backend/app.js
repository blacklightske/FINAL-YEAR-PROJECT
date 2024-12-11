const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log('Backend URL:', backendUrl);

const app = express();
app.use(express.json());

// Database connection
const mongoUrl = 
"mongodb+srv://georgietonga:blacklights@cluster0.ghuiznn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

  mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });


// User model
require("./UserDetails");
const User = mongoose.model("UserInfo");

// Store item model
require("./StoreItem");
const StoreItem = mongoose.model("StoreItem");

// Routes
app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { name, email, mobile, password, userType } = req.body;
  
  try {
    const oldUser = await User.findOne({ email: email.toLowerCase() });

    if (oldUser) {
      return res.status(400).send({ data: "User already exists!!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password: encryptedPassword,
      userType,
    });

    res.status(201).send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", req.body); // Debug: Log request body

  if (!email || !password) {
    console.log("Missing email or password"); // Debug: Log missing fields
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const oldUser = await User.findOne({ email: email.toLowerCase() });

    if (!oldUser) {
      console.log("User not found"); // Debug: Log user not found
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, oldUser.password);
    console.log('Password Valid:', isPasswordValid);
    if (!isPasswordValid) {
      console.log("Invalid credentials"); // Debug: Log invalid credentials
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET, { expiresIn: '1h' });
    res.send({
      status: "ok",
      data: token,
      userType: oldUser.userType,
    });
  } catch (error) {
    console.error('Login error:', error); // Debug: Log server error
    res.status(500).send({ message: "Internal Server Error" });
  }
});


app.post("/userdata", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    const data = await User.findOne({ email: useremail });
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ status: "Ok", data });
  } catch (error) {
    res.status(401).send({ error: "Invalid or expired token" });
  }
});

app.post("/update-user", async (req, res) => {
  const { name, email, mobile, image, gender, profession } = req.body;

  try {
    const result = await User.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          name,
          mobile,
          image,
          gender,
          profession,
        },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    res.send({ status: "Ok", data: "Updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: "Ok", data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/delete-user", async (req, res) => {
  const { id } = req.body;

  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    res.send({ status: "Ok", data: "User Deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Store Item Routes
app.post("/add-item", async (req, res) => {
  const { name, description, price, imageUrl, stock } = req.body;
  try {
    const newItem = new StoreItem({
      name,
      description,
      price,
      imageUrl,
      stock,
    });
    await newItem.save();
    res.status(201).send({ status: "ok", data: "Item Created" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await StoreItem.find({});
    res.send({ status: "ok", data: items });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

app.put("/update-item/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, stock } = req.body;
  try {
    const item = await StoreItem.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl, stock },
      { new: true }
    );
    res.send({ status: "ok", data: "Item Updated" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

app.delete("/delete-item/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await StoreItem.findByIdAndDelete(id);
    res.send({ status: "ok", data: "Item Deleted" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

app.listen(5001, () => {
  console.log("Node.js server started on port 5001.");
});
