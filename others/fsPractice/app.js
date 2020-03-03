const fs = require('fs');
const path = require('path');

console.clear();
// console.log(__dirname);
const directory = 'myFolder/';

// fs.stat('myFolder', (err, stats) => {
//     if (err) throw err;
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });

// fs.mkdir(directory+'css', (err)=>{
//        if(err) throw err;
//     console.log('create Directory success');
// })

// fs.readdir(directory, (err, files) => {
//     if (err) throw err;
//     for (const file of files) {
//         fs.unlink(path.join(directory, file), err => {
//             if (err) throw err;
//         });
//     }
// });

// fs.writeFile('t.txt', 'hello world', (err)=>{
//     if(err) throw err;
//     console.log('write success');
// })

// fs.appendFile(directory+'t.txt', 'append hi', err => {
//     if (err) throw err;
//     console.log('append success');
// });

// fs.readFile('t.txt', (err,data)=>{
//     if(err) throw err;
//     // console.log(data);
//     console.log(data.toString());
// })

// fs.readdir(directory, (err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

// fs.rename('hi.txt',directory+'/hi.css',err=>{
//     if(err) throw err;
//     console.log('rename success');
// })

// fs.rmdir(directory+'css', err => {
//     if(err) throw err;
//     console.log('delete directory success');
// })

// fs.unlink(directory+'t.txt', err => {
//     if(err) throw err;
//     console.log('delete file success');
// })

// fs.stat('upload', (err, stats) => {
//     if (err) {
//         fs.mkdir('upload', function (error) {
//             if (error) throw error;
//             console.log('create upload success');
//             return;
//         });
//     } else {
//         console.log('upload exist');
//         console.log(stats.isDirectory());
//     }
// });

// fs.readdir(directory, (err, files) => {
//     if (err) throw err;
//     console.log(files);
//     files.forEach(el => {
//         (function getFile(el){
//             fs.stat(el, (error, stats) => {
//                 if (error) throw error;
//                 // console.log(stats);
//                 console.log(path.extname(el));
//             });
//         })(directory+el)
//     });
// });

// var readStream = fs.createReadStream(directory+'asdf.js', {highWaterMark:1024*100});
// var str=''
// var count=0
// readStream.on('data', (chunk)=>{
//     // str+=chunk
//     count++
// })
//
// readStream.on('end', (chunk)=>{
//     // console.log(str);
//     console.log(count);
// })
// readStream.on('error', (chunk)=>{
//     // console.log('error');
// })

var writeStream = fs.createWriteStream(directory+'asdfwrite.js');
writeStream.on('finish',()=>{
    console.log('writeStream ends');
})
writeStream.on('error',(err)=>{
    if(err)throw err;
})

writeStream.write('asdfasf','utf8');
writeStream.write('11111','utf8');
writeStream.write('11111','utf8');
for (let i=0;i<10;i++){
    writeStream.write(''+i,'utf8');
}
writeStream.end()



