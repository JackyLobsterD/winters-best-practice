const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathname = req.url;
    console.log(pathname);
    res.write('hello nodejs');
    res.end();
}).listen(8001);

