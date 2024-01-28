const express = require("express");
const instagramDl = require("@sasmeee/igdl");
const bodyParser = require("body-parser");
const cors = require('cors');
const Semaphore = require("semaphore-async");

const app = express();
const port = 3000;

// Create a semaphore with a limit of 1 per IP address
const semaphores = new Map();

app.use(bodyParser.json());
app.use(cors());

app.get("/getInstagramData", async (req, res) => {
  const ip = req.ip;
  const semaphore = semaphores.get(ip);

  if (!semaphore) {
    semaphore = new Semaphore(1);
    semaphores.set(ip, semaphore);
  }

  try {
    await semaphore.acquire();

    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const data = await instagramDl(url);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data found for the provided URL" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something is Wrong" });
  } finally {
    semaphore.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
