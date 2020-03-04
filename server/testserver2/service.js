const http = require('http');
const url = require('url');
const fs = require('fs');

const staticFolder = './static';
const page404 = '/404.html';

const port = 3001;
const go404 = (res) => {
    console.log(404);
    console.log(staticFolder + page404);
    fs.readFile(staticFolder + page404, (err, data) => {
        if (err) throw err;
        res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
        console.log('write head');
        res.write(data);
        console.log('write data');
        res.end();
    });
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pathname = req.url;
    // const result = url.parse(req.url, true);
    console.log(pathname);
    // console.log(result.query);

    if (pathname === '/') {
        res.write('<h1>Hello</h1>Node.js is working');
        res.end();
    }

    if (pathname === '/favicon.ico') {
        fs.readFile(staticFolder + pathname, (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    }
    console.log('start read files');
    fs.readFile(staticFolder + pathname, (err, data) => {
        if (err) {
            go404(res);
        }
        console.log('no error');
        res.write(data);
        res.end();
    });
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
