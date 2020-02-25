var fs=require('fs')

var r=fs.createReadStream('./bigfile.png');
var w=fs.createWriteStream('./bigfile2.png');

// r.on('open',()=>{
//     console.log('open')
// })
// r.on('data',(chunk)=>{
//     // console.log(chunk)
//     w.write(chunk)
// })
// r.on('end',()=>{
//     console.log('end')
//     w.end()
// })
//

r.pipe(w)
