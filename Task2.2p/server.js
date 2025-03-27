const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/add', (req, res) => {
    const num1 = 5;
    const num2 = 10;
    const result = num1 + num2;
    res.json({ result });
});


app.get('/subtract', (req, res) => {
    const num1 = 10;
    const num2 = 5;
    const result = num1 - num2;
    res.json({ result });
});


app.get('/multiply', (req, res) => {
    const num1 = 5;
    const num2 = 10;
    const result = num1 * num2;
    res.json({ result });
});


app.get('/divide', (req, res) => {
    const num1 = 10;
    const num2 = 5;
    if (num2 !== 0) {
        const result = num1 / num2;
        res.json({ result });
    } else {
        res.status(400).json({ error: "Cannot divide by zero" });
    }
});


app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

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

    res.json({ result });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
