import express from "express";
import fs from "fs";
import admin from "firebase-admin";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import reusable database connection code
import { db, connectToDb } from "./db.js";

// Download credentials and read them
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

// Initialize Firebase Admin SDK with credentials
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

//renders the index.html file
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Middleware to authenticate requests
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.status(400).json({ error: "Invalid token" });
    }
  } else {
    req.user = {}; // Ensure req.user exists
  }
  next();
});

// Endpoint to load article data
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user || {};

  try {
    const article = await db.collection("articles").findOne({ name });

    if (article) {
      const upvoteIds = article.upvoteIds || [];
      article.canUpvote = uid && !upvoteIds.includes(uid);
      res.json(article);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve article" });
  }
});

// Middleware to ensure user is authenticated
app.use((req, res, next) => {
  if (req.user && req.user.uid) {
    next();
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

// Endpoint to upvote an article
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  try {
    const article = await db.collection("articles").findOne({ name });

    if (article) {
      const upvoteIds = article.upvoteIds || [];
      const canUpvote = uid && !upvoteIds.includes(uid);

      if (canUpvote) {
        await db
          .collection("articles")
          .updateOne(
            { name },
            { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } }
          );
      }
      const updatedArticle = await db.collection("articles").findOne({ name });
      res.json(updatedArticle);
    } else {
      res.status(404).send("Article doesn't exist!");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to upvote article" });
  }
});

// Endpoint to add a comment to an article
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await db
      .collection("articles")
      .updateOne({ name }, { $push: { comments: { postedBy: email, text } } });
    const article = await db.collection("articles").findOne({ name });

    if (article) {
      res.json(article);
    } else {
      res.status(404).send("Article doesn't exist!");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

const PORT = process.env.PORT || 8000;

// Connect to the database and start the server
connectToDb(() => {
  console.log("Successfully connected to database");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
