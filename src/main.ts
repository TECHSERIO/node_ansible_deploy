import express from 'express';
import {createClient} from 'redis';

// Initialize Express
const app = express();
const port = (process.env.NODE_ENV == 'production') ? 80 : 3000;

function getStyledResponse(counter: string) {
    return `
              <html lang="en">
                <head>
                  <style>
                    body {
                      background-color: lightskyblue;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      margin: 0;
                    }
                    .counter {
                      font-size: 20rem;
                      font-family: 'monospace';
                      color: darkblue;
                    }
                  </style><title>The AWESOME Counter!</title>
                </head>
                <body>
                  <div class="counter">${counter}</div>
                </body>
              </html>
            `;
}

async function main() {
    // Initialize Redis client
    const host = 'localhost';
    const redisPort = '6379';
    const redisUrl = `redis://${host}:${redisPort}`;


    const redisClient = await createClient({url: redisUrl})
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    app.get('/', async (_, res) => {
        try {
            await redisClient.incr('counter');  // Increment counter
            const counter = await redisClient.get('counter');  // Fetch counter

            const styledResponse = getStyledResponse(counter);

            res.send(styledResponse);
        } catch (err) {
            res.status(500).send(`Something went wrong: ${err.message}`);
        }
    });


    // Start the server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

main();
