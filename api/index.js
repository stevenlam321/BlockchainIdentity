const express = require('express')
const app = express()
const port = 3000

app.get('/download', (req, res) => {
    var filePath = "ca-crt.pem"; // Or format the path using the `id` rest param
    var fileName = "ca-crt.pem"; // The default name the browser will use

    res.download(filePath, fileName); 
});
app.get('/create', (req, res) => {
    console.log(req);
    // res.download(filePath, fileName); 
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var fs = require('fs'); 
var https = require('https'); 
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
}; 
https.createServer(options, function (req, res) { 
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.socket.getPeerCertificate().subject.CN+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200); 
    res.end("hello world\n"); 
}).listen(4444);

