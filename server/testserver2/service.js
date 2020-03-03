const http = require('http');
console.log('testserver2 started, listening to port 8001\n http://3.12.119.235:8001/');


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathname = req.url;
    console.log(pathname);
    res.write('hello nodejs');
    res.end();
}).listen(8001);

