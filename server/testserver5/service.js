const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const pathname = req.url;
    console.log(pathname);
    // console.log(req);
    console.log(req.headers);
    let contentDisposition = req.headers['content-disposition'];
    console.log(contentDisposition);
    const fileName = contentDisposition.split("; ")[1].split('=')[1];
    console.log(fileName);

    req.on('end', () => {
        res.writeHead(200, {"content-type": "text/html"});
        res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    });
    console.log('start to write');
    var writeStream = fs.createWriteStream('./'+fileName);
    req.pipe(writeStream);
});

const port = 3001;
console.log(port + ' started!');
server.listen(port, () => console.log(`Example app listening on port ${port}\n'+'http://3.12.119.235:${port}/`));
