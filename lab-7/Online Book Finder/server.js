// server.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "lab7"; // database name

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("MongoDB connected ->", DB_NAME);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

/* -------------------------
   BOOK FINDER APIs
------------------------- */

// Pagination (Load More)
app.get("/books", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const books = await db.collection("books")
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});


// Search Books by Title (CASE INSENSITIVE)
app.get("/books/search", async (req, res) => {
  try {

    const title = req.query.title || "";

    const books = await db.collection("books").find({
      title: { $regex: new RegExp(title, "i") }
    }).toArray();

    res.json(books);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});


// Filter Books by Category
app.get("/books/category/:category", async (req, res) => {
  try {

    const category = req.params.category;

    const books = await db.collection("books")
      .find({ category })
      .toArray();

    res.json(books);

  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});


// Sort Books
app.get("/books/sort/:type", async (req, res) => {
  try {

    const type = req.params.type;

    let sortOption = {};

    if (type === "price") {
      sortOption = { price: 1 };
    }
    else if (type === "rating") {
      sortOption = { rating: -1 };
    }
    else {
      return res.status(400).json({ error: "invalid sort type" });
    }

    const books = await db.collection("books")
      .find()
      .sort(sortOption)
      .toArray();

    res.json(books);

  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});


// Top Rated Books
app.get("/books/top", async (req, res) => {
  try {

    const books = await db.collection("books")
      .find({ rating: { $gte: 4 } })
      .limit(5)
      .toArray();

    res.json(books);

  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});


// Health Check
app.get("/ping", (req, res) => {
  res.send("Server Working");
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});