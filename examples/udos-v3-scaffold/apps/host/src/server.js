const express = require("express");
const fs = require("fs");
const path = require("path");
const { processFeed } = require("../../../packages/hivemind/index.js");

const app = express();
app.use(express.json());

const DATA_ROOT = path.resolve("udos-data");
const EVENTS = path.join(DATA_ROOT, "events.log");

function logEvent(e) {
  fs.appendFileSync(EVENTS, JSON.stringify(e) + "\n");
}

app.post("/api/feed", (req, res) => {
  const input = req.body;
  logEvent({ type: "feed.received", input, ts: Date.now() });

  const result = processFeed(input);
  logEvent({ type: "tasks.created", tasks: result.tasks, ts: Date.now() });

  res.json(result);
});

app.get("/api/events", (req, res) => {
  if (!fs.existsSync(EVENTS)) return res.json([]);
  const lines = fs.readFileSync(EVENTS, "utf-8").trim().split("\n");
  res.json(lines.map(l => JSON.parse(l)));
});

app.listen(3001, () => {
  console.log("Host running on http://localhost:3001");
});
