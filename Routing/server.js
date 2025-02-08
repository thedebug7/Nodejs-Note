const express = require('express');
const server = express();

// Middleware to parse JSON bodies
server.use(express.json());

// Mock Database
let users = [
    {id:1, name: 'samir'},
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Alice" },
]

const PORT = 5465;

// GET all User
server.get('/users', (request, response) => {
    response.status(200).json(users);
})

// Get user by ID
server.get('/users/:id', (request, response) => {
    // Find the user with the given ID
    const user = users.find((use) => {
        return use.id === parseInt(request.params.id)
    })
    
    // If the user is not found, return a 404 Not Found error
    if (!user){
        return response.status(404).json({Message : 'User NOT Found'})
    }

    // Respond with the updated user and 200 OK status
    response.status(200).json(user)
})

// POST a new User
server.post('/users', (request, response) => {
    
})

// Server Start
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

