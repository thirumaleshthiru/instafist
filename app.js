const express = require("express");
const instagramDl = require("@sasmeee/igdl");
const bodyParser = require("body-parser");
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 3000, // 5 seconds
  max: 5, // limit each IP to 1 request per 5 seconds
});

app.get("/getInstagramData", limiter, async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const data = await instagramDl(url);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data found for the provided URL" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something is Wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
