var http = require('http');
var express = require('express');
//create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

const https = require('https');
const fs = require('fs');
const app = express();


const opts = {
  key: fs.readFileSync('server_key.pem'),
  cert: fs.readFileSync('server_cert.pem'),
  requestCert: true,
  rejectUnauthorized: false, 
  ca: [ fs.readFileSync('server_cert.pem') ]
};

// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// }).listen(8000);

app.get('/', (req, res) => {
	res.send('<a href="authenticate">Log in using client certificate</a>')
})

// Then we add our protected endpoint: it just displays information about the user and the validity of their
// certificate. We can get the certificate information from the HTTPS connection handle:

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

// Let's create our HTTPS server and we're ready to go.
https.createServer(opts, app).listen(9999)