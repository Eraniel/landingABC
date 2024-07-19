const http = require('http');

const PORT = 5000;
const server = http.createServer(( req, res ) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('AAAAA');
});

server.listen(PORT, () => {
    console.log(`server is up and running on: ${PORT}`);
});