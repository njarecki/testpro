# Shared Task Notes

## Current endpoints
- `GET /` - Hello World
- `GET /fortune` - Random developer fortune
- `GET /ping` - Health check with uptime
- `GET /echo?message=text` - Echo with reverse
- `GET /dice?roll=2d6` - D&D-style dice roller (e.g., `/dice?roll=3d20`)
- `GET /magic8ball?question=text` - Magic 8-ball fortune teller
- `GET /coinflip` - Flip a coin (heads/tails)
- `GET /password?length=16` - Random password generator (4-128 chars)
- `GET /countdown?to=2025-12-31` - Countdown timer (defaults to end of day)
- `GET /uuid?count=1` - UUID v4 generator (1-10 UUIDs)
- `GET /color` - Random hex color generator (hex, rgb, css formats)
- `GET /joke` - Random programming joke (setup + punchline)
- `GET /morse?text=HELLO` - Text to morse code converter (max 100 chars)
- `GET /roman?number=42` - Number to Roman numeral converter (1-3999)
- `GET /lorem?words=50` - Lorem ipsum text generator (1-500 words)
- `GET /timestamp` - Unix timestamp converter (no params=now, `?unix=1234567890` or `?date=2025-01-01`)
- `GET /fizzbuzz?n=100` - Classic FizzBuzz sequence with stats (1-1000)
- `GET /base64?encode=text` or `?decode=base64` - Base64 encoder/decoder

## To test
```bash
npm start
# Visit http://localhost:3000/base64?encode=Hello%20World
```

## Ideas for next iteration
- `/hash?text=hello&algo=md5` - Hash generator (md5, sha1, sha256)
- `/emoji` - Random emoji generator
- `/qr?text=hello` - QR code generator (returns SVG)
