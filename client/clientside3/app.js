const Buffer = require('buffer').Buffer
//each 16bit
var buf1 = Buffer.from('tést');
var buf2 = Buffer.from('tést', 'latin1');
var buf3 = Buffer.from([1, 2, 3]);
console.log(buf1, buf2, buf3);
