// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Gemini API route
app.post("/api/gemini", async (req, res) => {
  try {
     const apiKey = process.env.GEMINI_API_KEY;

     const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           contents: [
             {
               parts: [{ text: req.body.prompt }]
             }
           ]
         }),
       }
     );

     const data = await response.json();
     res.json(data);
  } catch (error) {
     console.error("Gemini API error:", error);
     res.status(500).json({ error: "Error calling Gemini API" });
  }
});

app.listen(5000, () => console.log("Backend started at http://localhost:5000"));
