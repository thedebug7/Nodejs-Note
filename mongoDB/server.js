const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const ConnectDB = require('./config/db')

const server = express();

// Middleware
server.use(express.json());


// Connect DB
ConnectDB()

const PORT = process.env.PORT || 5465;



server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
