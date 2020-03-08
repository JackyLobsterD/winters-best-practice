const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const http = require('http');
const extract = require('extract-zip');

const FolderName = "../../dist";
const zipName = FolderName + ".zip";
const source = path.join(__dirname, FolderName);
const output = path.join(__dirname, zipName);
console.log(source);
console.log(output);
const sendFolder = (source, output, zipName) => {
    // const writeStream = fs.createWriteStream(output);
    // writeStream.on('close', () => {
    //     console.log("closed");
    //     console.log(archive.pointer() / 1024 + 'K');
    //     console.log('Archive finished');
    // });
    const archive = archiver('zip', {zlib: {level: 9}});
    archive.on('error', err => {
        throw err;
    });
    archive.directory(source, false);

    archive.on('end',()=>{
        console.log( 'archive end');
        req.end()
    });

    // const readStream = fs.createReadStream(output);
    // readStream.on('open', function () {
    //     console.log('open');
    // });
    console.log(zipName);
    const options = {
        hostname: '3.12.119.235',
        port: 3001,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; name=' + zipName
        }
    };
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
    });
    req.on('error', error => {
        console.error(error);
    });
    req.on('end', () => {
        console.log('req end');
    });
    // readStream.pipe(req);
    archive.pipe(req);
    archive.finalize();
    console.log("zip file created");
};

sendFolder(source, output, zipName);
