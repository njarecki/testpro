const express = require('express');
const app = express();
const PORT = 3000;
const startTime = Date.now();

const fortunes = [
  "A journey of a thousand miles begins with a single step.",
  "Good things come to those who code.",
  "Today is a good day to ship features.",
  "The bug you seek is closer than you think.",
  "Your next commit will be legendary.",
  "Fortune favors the well-tested.",
  "A clean codebase is a happy codebase.",
  "The best time to refactor was yesterday. The second best time is now."
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/fortune', (req, res) => {
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune });
});

app.get('/ping', (req, res) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  res.json({ status: 'ok', uptime: `${uptimeSec}s` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
