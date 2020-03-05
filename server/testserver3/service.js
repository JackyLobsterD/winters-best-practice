const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');




const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    req.on('end', () => {
        res.writeHead(200, {"content-type":"text/html"});
        res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    });
    console.log('start to write');
    console.log(req);
    var writeStream = fs.createWriteStream('./package.json');

    req.pipe(writeStream)

});

const port=3001;
console.log(port+' started!');
server.listen(port)
