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

## To test
```bash
npm start
# Visit http://localhost:3000/uuid
# Or: http://localhost:3000/uuid?count=5
```

## Ideas for next iteration
- `/color` - Random hex color generator
- `/lorem` - Lorem ipsum text generator
- `/joke` - Random programming joke
