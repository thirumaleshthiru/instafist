const express = require("express");
const instagramDl = require("@sasmeee/igdl");
const bodyParser = require("body-parser");
const cors = require('cors');
const Limiter = require('async-ratelimiter');

const app = express();
const port = 3000; // You can change the port as needed

app.use(bodyParser.json());
app.use(cors());

// Allow 1 request every 5 seconds
const limiter = new Limiter({ max: 1, duration: 5000 });

app.get("/getInstagramData", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    await limiter.removeTokens(1); // Wait until a token is available

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
