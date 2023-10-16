const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
    const nums = req.query.nums;
    if (!nums) {
        return res.status(400).json({ error: 'nums are required.' });
    }

    const numbers = nums.split(',').map(Number);
    if (numbers.some(isNaN)) {
        return res.status(400).json({ error: `${nums} is not a number.` });
    }

    req.numbers = numbers;
    next();
});

// Route for mean
app.get('/mean', (req, res) => {
    const mean = req.numbers.reduce((acc, num) => acc + num, 0) / req.numbers.length;
    res.json({ operation: 'mean', value: mean });
});

// Route for median
app.get('/median', (req, res) => {
    const sortedNumbers = [...req.numbers].sort((a, b) => a - b);
    let median;

    if (sortedNumbers.length % 2 === 0) {
        const mid1 = sortedNumbers[(sortedNumbers.length / 2) - 1];
        const mid2 = sortedNumbers[sortedNumbers.length / 2];
        median = (mid1 + mid2) / 2;
    } else {
        median = sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    }

    res.json({ operation: 'median', value: median });
});

// Route for mode
app.get('/mode', (req, res) => {
    const numCount = {};
    let mode = [];
    req.numbers.forEach((num) => {
        numCount[num] = (numCount[num] || 0) + 1;
    });

    for (const num in numCount) {
        if (!mode.length || numCount[num] > numCount[mode[0]]) {
            mode = [num];
        } else if (numCount[num] === numCount[mode[0]]) {
            mode.push(num);
        }
    }

    res.json({ operation: 'mode', value: mode });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;
