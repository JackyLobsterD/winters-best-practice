const http = require('http');
const url = require('url');
const port = 3001;
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathname = req.url;
    const result = url.parse(req.url, true);
    console.log(pathname);
    console.log(result.query);
    res.write('<h1>Hello</h1>Node.js is working');
    res.end();
    // req.on('end', () => {
    //     res.writeHead(200, {"content-type":"text/html"});
    //     res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    // });

});

server.listen(port, '172.31.43.114',() => console.log(`Example app listening on port ${port}\nhttp://3.12.119.235:${port}/`));
