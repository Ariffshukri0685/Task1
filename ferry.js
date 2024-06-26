const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware to parse JSON body
app.use(bodyParser.json());

let stops = [];
let tickets = [];
let stopIdCounter = 1;
let ticketIdCounter = 1;

// Add Stop
app.post('/stops', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Stop name is required' });
    }
    const newStop = { id: String(stopIdCounter++), name };
    stops.push(newStop);
    res.status(201).json(newStop);
});

// Buy Ticket
app.post('/tickets', (req, res) => {
    const { startStop, endStop, price } = req.body;
    if (!startStop || !endStop || isNaN(price)) {
        return res.status(400).json({ error: 'Start stop, end stop, and price are required and must be valid' });
    }
    if (startStop === endStop) {
        return res.status(400).json({ error: 'Start stop and end stop cannot be the same' });
    }
    if (!stops.find(stop => stop.id === startStop) || !stops.find(stop => stop.id === endStop)) {
        return res.status(404).json({ error: 'Invalid stop ID' });
    }
    const newTicket = { id: String(ticketIdCounter++), startStop, endStop, price: parseFloat(price) };
    tickets.push(newTicket);
    res.status(201).json(newTicket);
});



// Get Ticket Info
app.get('/tickets/:id', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
});

// List Tickets
app.get('/tickets', (req, res) => {
    const { startStop, endStop } = req.query;
    let filteredTickets = tickets;
    if (startStop) {
        filteredTickets = filteredTickets.filter(t => t.startStop === startStop);
    }
    if (endStop) {
        filteredTickets = filteredTickets.filter(t => t.endStop === endStop);
    }
    res.json(filteredTickets);
});

// Cancel Ticket
app.delete('/tickets/:id', (req, res) => {
    const ticketIndex = tickets.findIndex(t => t.id === req.params.id);
    if (ticketIndex === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }
    tickets.splice(ticketIndex, 1);
    res.status(204).send();
});

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});