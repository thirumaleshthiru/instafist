const express = require("express");
const instagramDl = require("@sasmeee/igdl");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Commented out the rate limit middleware
// const limiter = rateLimit({
//   windowMs: 3000, // 3 seconds
//   max: 15, // limit each IP to 15 requests per 3 seconds
//   keyGenerator: function (req) {
//     return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   }
// });

// Removed the limiter middleware from the route
app.get("/getInstagramData", /*limiter,*/ async (req, res) => {
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
