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

app.get('/coinflip', (req, res) => {
  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  res.json({ result, timestamp: new Date().toISOString() });
});

app.get('/password', (req, res) => {
  const length = Math.min(Math.max(parseInt(req.query.length) || 16, 4), 128);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  res.json({ password, length });
});

app.get('/uuid', (req, res) => {
  const count = Math.min(Math.max(parseInt(req.query.count) || 1, 1), 10);
  const uuids = [];
  for (let i = 0; i < count; i++) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    uuids.push(uuid);
  }
  res.json(count === 1 ? { uuid: uuids[0] } : { uuids, count });
});

app.get('/color', (req, res) => {
  const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  res.json({
    hex: `#${hex}`,
    rgb: { r, g, b },
    css: `rgb(${r}, ${g}, ${b})`
  });
});

const programmingJokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they can't C#." },
  { setup: "A SQL query walks into a bar, walks up to two tables and asks...", punchline: "Can I join you?" },
  { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself." },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None, that's a hardware problem." },
  { setup: "Why do programmers hate nature?", punchline: "It has too many bugs." },
  { setup: "What's a programmer's favorite hangout place?", punchline: "Foo Bar." },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache." },
  { setup: "What do you call a programmer from Finland?", punchline: "Nerdic." },
  { setup: "Why do programmers always mix up Halloween and Christmas?", punchline: "Because Oct 31 == Dec 25." }
];

app.get('/joke', (req, res) => {
  const joke = programmingJokes[Math.floor(Math.random() * programmingJokes.length)];
  res.json(joke);
});

const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

app.get('/morse', (req, res) => {
  const text = (req.query.text || 'HELLO').toUpperCase().slice(0, 100);
  const morse = text.split('').map(c => morseCode[c] || '').join(' ');
  res.json({ text, morse });
});

app.get('/roman', (req, res) => {
  const num = parseInt(req.query.number);
  if (isNaN(num) || num < 1 || num > 3999) {
    return res.status(400).json({ error: 'Number must be between 1 and 3999' });
  }
  const romanNumerals = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  let remaining = num;
  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  res.json({ number: num, roman: result });
});

app.get('/countdown', (req, res) => {
  const now = new Date();
  let target;
  if (req.query.to) {
    target = new Date(req.query.to);
    if (isNaN(target.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 (e.g., 2025-12-31T23:59:59)' });
    }
  } else {
    target = new Date(now);
    target.setHours(23, 59, 59, 999);
  }
  const diffMs = target - now;
  const isPast = diffMs < 0;
  const absDiff = Math.abs(diffMs);
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);
  res.json({
    target: target.toISOString(),
    remaining: isPast ? 'past' : { days, hours, minutes, seconds },
    message: isPast ? 'Target time has passed!' : `${days}d ${hours}h ${minutes}m ${seconds}s remaining`
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
