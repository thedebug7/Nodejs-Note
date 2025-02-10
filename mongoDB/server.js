const express = require('express');
const server = express();

const PORT = 5465;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
