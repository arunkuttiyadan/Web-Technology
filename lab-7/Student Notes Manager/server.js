const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));   // 🔴 serves index.html and script.js

// MongoDB connection
const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function connectDB() {
  await client.connect();
  db = client.db("student_notes");
  console.log("MongoDB Connected");
}

connectDB();


// -------- ADD NOTE --------
app.post("/notes", async (req, res) => {

  const note = {
    title: req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    created_date: new Date()
  };

  const result = await db.collection("notes").insertOne(note);

  res.json(result);
});


// -------- VIEW NOTES --------
app.get("/notes", async (req, res) => {

  const notes = await db.collection("notes").find().toArray();

  res.json(notes);
});


// -------- UPDATE NOTE --------
app.put("/notes/:id", async (req, res) => {

  const id = req.params.id;

  const result = await db.collection("notes").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: req.body.title,
        description: req.body.description
      }
    }
  );

  res.json(result);
});


// -------- DELETE NOTE --------
app.delete("/notes/:id", async (req, res) => {

  const id = req.params.id;

  const result = await db.collection("notes").deleteOne(
    { _id: new ObjectId(id) }
  );

  res.json(result);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});