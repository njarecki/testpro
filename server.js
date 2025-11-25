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

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

app.get('/lorem', (req, res) => {
  const count = Math.min(Math.max(parseInt(req.query.words) || 50, 1), 500);
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const text = words.join(' ') + '.';
  res.json({ text, wordCount: count });
});

app.get('/timestamp', (req, res) => {
  const { unix, date } = req.query;
  if (unix) {
    const ts = parseInt(unix);
    if (isNaN(ts)) {
      return res.status(400).json({ error: 'Invalid unix timestamp' });
    }
    const d = new Date(ts * 1000);
    return res.json({
      unix: ts,
      iso: d.toISOString(),
      human: d.toUTCString()
    });
  }
  if (date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    return res.json({
      unix: Math.floor(d.getTime() / 1000),
      iso: d.toISOString(),
      human: d.toUTCString()
    });
  }
  const now = new Date();
  res.json({
    unix: Math.floor(now.getTime() / 1000),
    iso: now.toISOString(),
    human: now.toUTCString()
  });
});

app.get('/fizzbuzz', (req, res) => {
  const n = Math.min(Math.max(parseInt(req.query.n) || 15, 1), 1000);
  const sequence = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) sequence.push('FizzBuzz');
    else if (i % 3 === 0) sequence.push('Fizz');
    else if (i % 5 === 0) sequence.push('Buzz');
    else sequence.push(i);
  }
  const stats = {
    fizz: sequence.filter(x => x === 'Fizz').length,
    buzz: sequence.filter(x => x === 'Buzz').length,
    fizzBuzz: sequence.filter(x => x === 'FizzBuzz').length,
    numbers: sequence.filter(x => typeof x === 'number').length
  };
  res.json({ n, sequence, stats });
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

app.get('/base64', (req, res) => {
  const { encode, decode } = req.query;
  if (encode) {
    const encoded = Buffer.from(encode).toString('base64');
    return res.json({ original: encode, encoded, operation: 'encode' });
  }
  if (decode) {
    try {
      const decoded = Buffer.from(decode, 'base64').toString('utf-8');
      return res.json({ original: decode, decoded, operation: 'decode' });
    } catch (e) {
      return res.status(400).json({ error: 'Invalid base64 string' });
    }
  }
  res.status(400).json({ error: 'Provide ?encode=text or ?decode=base64string' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
