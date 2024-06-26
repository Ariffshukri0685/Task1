const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST endpoint to calculate sum
app.post('/sum', (req, res) => {
  const { num1, num2 } = req.body;

  // Check if num1 and num2 are provided and are numbers
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid input. Please provide two numbers.' });
  }

  // Calculate sum
  const sum = parseFloat(num1) + parseFloat(num2);

  // Return the result as JSON
  res.json({ sum });
});

// GET endpoint to calculate sum
app.get('/sum', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if num1 and num2 are provided and are numbers
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid input. Please provide two numbers.' });
  }

  // Calculate sum
  const sum = parseFloat(num1) + parseFloat(num2);

  // Return the result as JSON
  res.json({ sum });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
