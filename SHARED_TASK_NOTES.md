# Shared Task Notes

## Current endpoints
- `GET /` - Hello World
- `GET /fortune` - Random developer fortune
- `GET /ping` - Health check with uptime
- `GET /echo?message=text` - Echo with reverse
- `GET /dice?roll=2d6` - D&D-style dice roller (e.g., `/dice?roll=3d20`)
- `GET /magic8ball?question=text` - Magic 8-ball fortune teller
- `GET /coinflip` - Flip a coin (heads/tails)
- `GET /countdown?to=2025-12-31` - Countdown timer (defaults to end of day)

## To test
```bash
npm start
# Visit http://localhost:3000/countdown
# Or: http://localhost:3000/countdown?to=2025-12-31T23:59:59
```

## Project status
Simple webserver is complete with 8 endpoints. Ready for use.
