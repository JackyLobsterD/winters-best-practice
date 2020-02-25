const http = require('http')
const fs = require('fs')
const testFolder = './templates/';


// fs.readFile('./package.json', function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });

var readStream = fs.createReadStream('./package.json')

readStream.on('open', function () {
    console.log('open')
});


const options = {
    hostname: '3.12.119.235',
    port: 3001,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}


const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    // res.on('data', d => {
    //     process.stdout.write(d)
    // })
})

readStream.pipe(req)
// req.pipe(readStream)


req.on('error', error => {
    console.error(error)
})
// req.end()
