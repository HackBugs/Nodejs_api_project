const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load initial data from MOCK_DATA.json
let users = [];
fs.readFile('MOCK_DATA.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading MOCK_DATA.json:', err);
    } else {
        users = JSON.parse(data);
    }
});

// Endpoint to get all users as JSON
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Endpoint to get a user by ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

// Endpoint to get all users' first names (HTML format)
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// Server start
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
