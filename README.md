
#### Testing with [Postman](https://www.postman.com/downloads/) or Browser
#### Website for API generate - [Mockaroo](https://www.mockaroo.com/)
#### Download [MongoDB](https://www.mongodb.com/try/download/community) for store date like database
#### Download [Node.js](https://nodejs.org/en/download/package-manager) JavaScript (but for server-side development)

    - GET Request: Direct browser se access karein http://localhost:3000/api/device-data.
    - GET Request: Direct browser se access karein http://localhost:3000/api/users
    - GET Request: Direct browser se access karein http://localhost:3000/api/users/1\
    - POST, PUT, DELETE: Postman ya kisi aur API testing tool se test karein. 

Summary:

    ```- Multiple APIs: Aapke paas ab multiple endpoints hain jo device data ko handle kar sakte hain.
    - CRUD Operations: Humne basic CRUD operations implement kiye hain (Create, Read, Update, Delete).```
    
Aap is API ko frontend mein fetch ya axios se call kar sakte hain aur data ko display ya modify kar sakte hain.


> Node.js backend setup karne ke liye aapko kuch steps follow karne padhenge. Isme hum Node.js ko install karenge, ek basic Express server banayenge, aur phir API setup karenge. Chaliye step-by-step dekhte hain kaise setup kiya jata hai:

### Node.js Backend Setup

#### 1. **Node.js Install Karna**
   - Sabse pehle aapko Node.js ko install karna hoga. Agar aapke system mein Node.js already install nahi hai, to aap [Node.js official website](https://nodejs.org/) se download kar sakte hain.
   - Website par jaakar LTS (Long Term Support) version download karein aur installation instructions follow karein.

   - Installation check karne ke liye, terminal ya command prompt mein yeh commands run karein:
   ```bash
   node -v
   npm -v
   ```
   - Agar aapko versions dikh rahi hain (e.g., `v18.x.x`), to Node.js aur npm successfully install ho chuke hain.

#### 2. **Project Directory Setup Karna**
   - Ek new directory banayen jaha aap apna Node.js project rakhna chahte hain:
   ```bash
   mkdir my-node-backend
   mkdir my-node-frontend
   ```

   - Ab is directory mein ek `package.json` file initialize karein:
   ```bash
   npm init -y
   ```
   - Isse ek default `package.json` file create ho jayegi jo aapke project ki dependencies aur metadata store karegi.

#### 3. **Express.js Install Karna**
   - Express.js ko Node.js ke upar backend server banane ke liye use kiya jata hai. Isko install karne ke liye:
   ```bash
   npm install express
   ```

#### 4. **Backend Server Code Likhe**
   - Aapke project directory mein ek `server.js` file banayen aur isme basic Express server setup karein:
   `cd my-node-backend`
   `server.js`:
 ```javascript
 // server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initial device data
let deviceData = {
    temperature: 25,
    humidity: 60,
    status: 'Active',
    likes: 0 // Initialize likes
};

// GET endpoint
app.get('/api/device-data', (req, res) => {
    res.json(deviceData);
});

// POST endpoint
app.post('/api/device-data', (req, res) => {
    const newData = req.body;

    if (newData.temperature !== undefined) deviceData.temperature = newData.temperature;
    if (newData.humidity !== undefined) deviceData.humidity = newData.humidity;
    if (newData.status !== undefined) deviceData.status = newData.status;

    res.json({
        message: 'Device data updated successfully!',
        data: deviceData
    });
});

// PUT endpoint
app.put('/api/device-data', (req, res) => {
    const newData = req.body;
    if (newData.temperature !== undefined) deviceData.temperature = newData.temperature;
    if (newData.humidity !== undefined) deviceData.humidity = newData.humidity;
    if (newData.status !== undefined) deviceData.status = newData.status;

    res.json({
        message: 'Device data updated successfully!',
        data: deviceData
    });
});

// DELETE endpoint
app.delete('/api/device-data', (req, res) => {
    deviceData = {
        temperature: 0,
        humidity: 0,
        status: 'Inactive',
        likes: 0
    };

    res.json({
        message: 'Device data deleted successfully!',
        data: deviceData
    });
});

// Like endpoint
app.post('/api/device-data/like', (req, res) => {
    deviceData.likes += 1; // Increment likes
    res.json({
        message: 'Device data liked!',
        data: deviceData
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

```

```html
 // index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Device Data</title>
</head>
<body>
    <h1>Device Data</h1>
    <div id="device-data">
        <p>Temperature: <span id="temperature">25</span>°C</p>
        <p>Humidity: <span id="humidity">60</span>%</p>
        <p>Status: <span id="status">Active</span></p>
        <p>Likes: <span id="likes">0</span></p>
    </div>
    <button id="like-button">Like</button>

    <script>
        // Function to fetch and display device data
        function fetchDeviceData() {
            fetch('http://localhost:3000/api/device-data')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('temperature').textContent = data.temperature;
                    document.getElementById('humidity').textContent = data.humidity;
                    document.getElementById('status').textContent = data.status;
                    document.getElementById('likes').textContent = data.likes;
                });
        }

        // Function to like the device data
        function likeDeviceData() {
            fetch('http://localhost:3000/api/device-data/like', {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('likes').textContent = data.data.likes;
            });
        }

        document.getElementById('like-button').addEventListener('click', likeDeviceData);

        // Initial fetch
        fetchDeviceData();
    </script>
</body>
</html>

```

#### 5. **Server Ko Run Kare**
   - Terminal mein yeh command run karein:
   ```bash
   node server.js
   ```
   - Agar sab kuch sahi hai, to aapko message milega: `Server is running on http://localhost:3000`.
   - Apne browser mein `http://localhost:3000` ko open karein, aur aapko "Hello, Node.js Backend Server is Running!" message dikhai dega.

#### 6. **Additional Steps (Optional)**
   - **Nodemon Install Karna**: Development mein convenience ke liye, aap `nodemon` use kar sakte hain jo automatically server ko restart kar deta hai jab aap code mein changes karte hain.
   ```bash
   npm install -g nodemon
   ```
   - Server ko nodemon ke saath start karein:
   ```bash
   nodemon server.js
   ```

### Summary:
1. **Node.js Install Karein**: Node.js aur npm install karein.
2. **Project Setup Karein**: Ek project directory banayen aur `package.json` initialize karein.
3. **Express Install Karein**: Express.js ko npm ke through install karein.
4. **Server Code Likhein**: Ek simple Express server setup karein `server.js` mein.
5. **Run Karein**: Server ko `node server.js` se run karein aur browser mein check karein.

Yeh basic setup aapko ek running Node.js backend server provide karega jisme aap apni API aur backend logic add kar sakte hain.
