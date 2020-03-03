const http = require('http');

const port=3001
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    req.on('end', () => {
        res.writeHead(200, {"content-type":"text/html"});
        res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    });
    const pathname = req.url;
    console.log(pathname);
    res.write('hello nodejs');
    res.end();
});

console.log(`testserver2 started, listening to port ${port}\n http://3.12.119.235:${port}/`);
server.listen(port);