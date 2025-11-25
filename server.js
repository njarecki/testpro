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

app.get('/echo', (req, res) => {
  const message = req.query.message || 'Hello!';
  const reversed = message.split('').reverse().join('');
  res.json({
    original: message,
    reversed: reversed,
    length: message.length
  });
});

const magic8BallAnswers = [
  "It is certain.",
  "Reply hazy, try again.",
  "Don't count on it.",
  "It is decidedly so.",
  "Ask again later.",
  "My reply is no.",
  "Without a doubt.",
  "Better not tell you now.",
  "My sources say no.",
  "Yes definitely.",
  "Cannot predict now.",
  "Outlook not so good.",
  "You may rely on it.",
  "Concentrate and ask again.",
  "Very doubtful.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes."
];

app.get('/magic8ball', (req, res) => {
  const question = req.query.question || 'Will I be lucky today?';
  const answer = magic8BallAnswers[Math.floor(Math.random() * magic8BallAnswers.length)];
  res.json({ question, answer });
});

app.get('/dice', (req, res) => {
  const roll = req.query.roll || '1d6';
  const match = roll.match(/^(\d+)d(\d+)$/i);
  if (!match) {
    return res.status(400).json({ error: 'Invalid format. Use NdM (e.g., 2d6)' });
  }
  const numDice = Math.min(parseInt(match[1]), 100);
  const sides = Math.min(parseInt(match[2]), 1000);
  const rolls = [];
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  res.json({
    roll: `${numDice}d${sides}`,
    results: rolls,
    total: rolls.reduce((a, b) => a + b, 0)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
