const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI;

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1)
    }
}

module.exports = ConnectDB;