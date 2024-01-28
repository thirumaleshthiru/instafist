const express = require("express");
const instagramDl = require("@sasmeee/igdl");
const bodyParser = require("body-parser");
const cors = require('cors');
const Queue = require("bull");

const app = express();
const port = 3000;

const downloadQueue = new Queue("download-queue");

app.use(bodyParser.json());
app.use(cors());

app.get("/getInstagramData", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  downloadQueue.add("download-task", { url: url });
  res.json({ message: "Request queued for processing" });
});

downloadQueue.process("download-task", async (job) => {
  const data = await instagramDl(job.data.url);
  // ... (process and store data)
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
