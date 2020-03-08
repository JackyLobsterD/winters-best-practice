const http = require('http');
const fs = require('fs');
const extract = require('extract-zip');
const unzipper = require('unzipper');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const pathname = req.url;
    console.log(pathname);
    let contentDisposition = req.headers['content-disposition'];
    const fileName = contentDisposition.split("; ")[1].split('=')[1];
    console.log(fileName);

    req.on('data',(data)=>{
        // console.log(data);
        console.log('req.on data');
    })
    req.on('end', () => {
        console.log('req.on end');
        res.writeHead(200, {"content-type": "text/html"});
        res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
    });
    console.log('start to write');
    var writeStream = fs.createWriteStream('./' + fileName);
    // req.pipe(writeStream);
    req
        .pipe(unzipper.Extract({path: './'+fileName.split('.')[0]}));
    // unzipper.Extract({path: './dist'})

    console.log('start to extract');
    console.log(fileName.split('.')[0]);
    // console.log(__dirname);
    // extract('./' + fileName, {dir: __dirname + '/' + fileName.split('.')[0]}, function (err) {
    //     // extraction is complete. make sure to handle the err
    //     throw err;
    // });


});

const port = 3001;
console.log(port + ' started!');
server.listen(port, () => console.log(`Example app listening on port ${port}\n'+'http://3.12.119.235:${port}/`));
