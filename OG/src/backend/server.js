import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

// Allow frontend (Vite dev server) to access backend
app.use(cors());

// API endpoint: /api/wiki?query=PLACE_NAME
app.get("/api/wiki", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const formattedQuery = query.trim().replace(/\s+/g, "_");
    const wikiRes = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedQuery}`
    );
    res.json(wikiRes.data);
  } catch (err) {
    res.status(404).json({ error: "Place not found on Wikipedia" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
