const fs = require('fs')
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
    if (req.url === "/upload" && req.method.toLowerCase() === "get") {
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.end(
            '<form method="POST" id="uploadForm" action="http://127.0.0.1:8888/upload" enctype="multipart/form-data">' +
            '<input type="file" id="file" name="file" />' +
            '<br>' +
            '<input type="submit" value="Submit">' +
            '</form>'
        )
    }
    if (req.url === "/upload" && req.method.toLowerCase() === "post") {
        parseFile(req, res)
    }
})

function parseFile(req, res) {
    req.setEncoding("binary");
    let body = ""; // 文件数据
    let fileName = ""; // 文件名

    // 边界字符串
    let boundary = req.headers['content-type']
        .split('; ')[1]
        .replace("boundary=", "")

    req.on("data", function(chunk) {
        body += chunk;
    });

    req.on("end", function() {
        // 字符串转化为对象
        const file = querystring.parse(body, "\r\n", ":");

        // 只处理图片文件;
        if (file["Content-Type"].indexOf("image") !== -1) {
            //获取文件名
            const fileInfo = file["Content-Disposition"].split("; ");
            for (let value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                    if (fileName.indexOf("\\") != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                    }

                    fileName = reconvert(fileName); // unicode转中文
                    console.log("文件名: " + fileName);
                }
            }

            // 获取图片类型(如：image/gif 或 image/png))
            const entireData = body.toString();
            const contentTypeRegex = /Content-Type: image\/.*/;

            contentType = file["Content-Type"].substring(1);

            //获取文件二进制数据开始位置，即contentType的结尾
            const upperBoundary = entireData.indexOf(contentType) + contentType.length;
            const shorterData = entireData.substring(upperBoundary);

            // 替换开始位置的空格
            const binaryDataAlmost = shorterData
                .replace(/^\s\s*/, "")
                .replace(/\s\s*$/, "");

            // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
            const binaryData = binaryDataAlmost.substring(
                0,
                binaryDataAlmost.indexOf("--" + boundary + "--")
            );

            //   console.log("binaryData", binaryData);
            const bufferData = new Buffer.from(binaryData, "binary");
            console.log("bufferData", bufferData);

            // fs.writeFile(fileName, binaryData, "binary", function(err) {
            //   res.end("sucess");
            // });
            fs.writeFile(fileName, bufferData, function(err) {
                res.end("sucess");
            });
        } else {
            res.end("reupload");
        }
    })
}

/**
 * @description unicode转中文
 * @param {String} str
 */
function reconvert(str){
    str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
    });

    return str;
}
server.listen(8888)

console.log('server is listening on 8888')
