// imports the Express.js framework
const express = require('express'); 
// Called express application
const app = express();

// Define the port 
const PORT = 4848;

// Define the route 
app.get('/', (req,res) => {
    res.send('Hello from the ExpressJS...')
})

// Startin the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})