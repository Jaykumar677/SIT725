const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies for POST requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Route to add two numbers (GET)
app.get('/add', (req, res) => {
    const num1 = 5;
    const num2 = 10;
    const result = num1 + num2;
    res.json({ result: result });
});

// Route to subtract two numbers (GET)
app.get('/subtract', (req, res) => {
    const num1 = 10;
    const num2 = 5;
    const result = num1 - num2;
    res.json({ result: result });
});

// Route to multiply two numbers (GET)
app.get('/multiply', (req, res) => {
    const num1 = 5;
    const num2 = 10;
    const result = num1 * num2;
    res.json({ result: result });
});

// Route to divide two numbers (GET)
app.get('/divide', (req, res) => {
    const num1 = 10;
    const num2 = 5;
    if (num2 !== 0) {
        const result = num1 / num2;
        res.json({ result: result });
    } else {
        res.status(400).json({ error: "Cannot divide by zero" });
    }
});

// POST route to calculate dynamically (basic calculator)
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    // Check if the numbers are valid
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided." });
    }

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            break;
        default:
            return res.status(400).json({ error: "Invalid operation. Supported operations are add, subtract, multiply, divide." });
    }
    
    res.json({ result: result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
