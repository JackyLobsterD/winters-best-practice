const http = require('http');


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathname = req.url;
    console.log(pathname);
    res.write('hello nodejs');
    res.end();
});

console.log('testserver2 started, listening to port 8001\n http://3.12.119.235:8001/');
server.listen(8001);
