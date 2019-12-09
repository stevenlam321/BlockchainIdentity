var https = require('https'); 
var options = { 
    hostname: 'localhost', 
    port: 4444, 
    path: '/authenticate', 
    method: 'GET', 
    key: fs.readFileSync('keys/client-private.pem'), 
    cert: fs.readFileSync('keys/client-crt.pem'), 
    ca: fs.readFileSync('keys/ca-crt.pem') 
}; 
var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
}); 
req.end();