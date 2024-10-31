const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// Set up Express app
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Start HTTP server
const server = app.listen(port, () => {
    console.log(`Server running. Start Browsing on http://localhost:${port}/home.html`);
});

// Set up WebSocket server on top of HTTP server
const wss = new WebSocket.Server({ server });

// Auction state
let ideas = [];

// Broadcast the auction state to all connected clients
function broadcastIdeasUpdate() {
    const auctionState = JSON.stringify({
        ideas
        });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(auctionState);
        }
    });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send(JSON.stringify({ highestBid, highestBidder }));

    // Handle incoming bids
    ws.on('message', (message) => {
        const { newIdea } = JSON.parse(message);

        // Check if the bid is higher than the current highest bid
        if (idea) {
            idea = newIdea;
            broadcastBidUpdate(); // Broadcast the updated auction state
        } else {
            ws.send(JSON.stringify({ error: 'Your idea is incorected' }));
        }
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
