# Shared Task Notes

## Current endpoints
- `GET /` - Hello World
- `GET /fortune` - Random developer fortune
- `GET /ping` - Health check with uptime
- `GET /echo?message=text` - Echo with reverse
- `GET /dice?roll=2d6` - D&D-style dice roller (e.g., `/dice?roll=3d20`)
- `GET /magic8ball?question=text` - Magic 8-ball fortune teller

## To test
```bash
npm start
# Visit http://localhost:3000/magic8ball?question=Will%20today%20be%20good
```

## Project status
Simple webserver is complete with 6 endpoints. Ready for use.
