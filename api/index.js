const express = require('express')
const app = express()
var fs = require('fs'); 
var https = require('https'); 
const port = 3000

app.get('/authenticate', (req, res) => {
	const cert = req.connection.getPeerCertificate()

// The `req.client.authorized` flag will be true if the certificate is valid and was issued by a CA we white-listed
// earlier in `opts.ca`. We display the name of our user (CN = Common Name) and the name of the issuer, which is
// `localhost`.

	if (req.client.authorized) {
		res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`)
// They can still provide a certificate which is not accepted by us. Unfortunately, the `cert` object will be an empty
// object instead of `null` if there is no certificate at all, so we have to check for a known field rather than
// truthiness.

	} else if (cert.subject) {
		res.status(403)
		   .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
// And last, they can come to us with no certificate at all:
	} else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
	}
})

app.get('/download', (req, res) => {
    var filePath = "ca-crt.pem"; // Or format the path using the `id` rest param
    var fileName = "ca-crt.pem"; // The default name the browser will use

    res.download(filePath, fileName); 
});
app.get('/create', (req, res) => {
    res.send('success');
    console.log(req);
    // res.download(filePath, fileName); 
});


var options = { 
    key: fs.readFileSync('keys/server-key.pem'), 
    cert: fs.readFileSync('keys/server-crt.pem'), 
    ca: fs.readFileSync('keys/ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: false
}; 
https.createServer(options, app).listen(4444);

