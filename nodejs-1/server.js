const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200, {"content-type": 'text/plain'});
    res.end('Hello From Nodejs.');
})

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})
