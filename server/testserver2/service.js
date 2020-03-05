const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mimeModel = require('./model/getMime');

const staticFolder = './static';
const PAGE404 = '/404.html';
const FAVICON = '/favicon.ico';
const ROOT = '/';
const port = 3001;


const go404 = (res) => {
    console.log(404);
    fs.readFile(staticFolder + PAGE404, (err, data) => {
        if (err) throw err;
        res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
        res.write(data);
        res.end();
    });
};

const server = http.createServer((req, res) => {
    const pathname = req.url;
    const extName=path.extname(pathname)
    // const result = url.parse(req.url, true);
    console.log(pathname);
    // console.log(result.query);

    if (pathname === ROOT) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Hello</h1>Node.js is working');
        res.end();
    } else if (pathname === FAVICON) {
        fs.readFile(staticFolder + pathname, (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else {
        fs.readFile(staticFolder + pathname, (err, data) => {
            if (err) go404(res);
            else {
                const mime=mimeModel.getMime(extName);
                res.writeHead(200,{'Content-Type': ''+mime+";charset='utf-8'"});
                console.log('no error');
                res.write(data);
                res.end();
            }
        });

    }
    // req.on('end', () => {
    //     res.writeHead(200, {"content-type":"text/html"});
    //     res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    // });

});

server.listen(port, '172.31.43.114', () => console.log(`Example app listening on port ${port}\n'+'http://3.12.119.235:${port}/`));

// server.on('error', (e) => {
//     if (e.code === 'EADDRINUSE') {
//         console.log('Address in use, retrying...');
//         setTimeout(() => {
//             server.close();
//             server.listen(port, '172.31.43.114', () => console.log(`Example app listening on port ${port}\nhttp://3.12.119.235:${port}/`));
//         }, 1000);
//     }
// });
