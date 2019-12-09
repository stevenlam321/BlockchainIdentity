const express = require('express')
const app = express()
var fs = require('fs'); 
var https = require('https'); 
var http = require('http'); 
var forge = require('node-forge');
const port = 3000;
const keyPath = 'keys/';
const caCertName =  'ca-crt.pem';
const caKeyName =  "ca-key.pem";
const caCertPath = keyPath  + caCertName;
const caKeyPath = keyPath  + caKeyName;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/download_ca_cert', (req, res) => {
    var filePath = caCertPath; 
    var fileName = caCertName;
    res.download(filePath, fileName); 
});

app.post('/register', (req, res) => {
   // res.send(req.body.csr);

const caCertPem = fs.readFileSync(caCertPath);
var caCert = forge.pki.certificateFromPem(caCertPem);
// console.log(caCert);
//const csrPem = fs.readFileSync("client-csr.pem");
const csrPem = req.body.csr;
// convert a Forge certification request from PEM-format
var csr = forge.pki.certificationRequestFromPem(csrPem);

var cert = forge.pki.createCertificate();
cert.publicKey = csr.publicKey;
// alternatively set public key from a csr
// NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
// Conforming CAs should ensure serialNumber is:
// - no more than 20 octets
// - non-negative (prefix a '00' if your value starts with a '1' bit)
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();

cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

cert.setSubject(csr.subject.attributes);
// alternatively set subject from a csr
//cert.setSubject(csr.subject.attributes);
cert.setIssuer(caCert.subject.attributes);
// cert.setIssuer(attrs);
// self-sign certificate
const caPrivateKeyPem = fs.readFileSync(caKeyPath);


var privateKey = forge.pki.decryptRsaPrivateKey(caPrivateKeyPem, 'password');

cert.sign(privateKey);
// convert a Forge certificate to PEM
var cert_pem = forge.pki.certificateToPem(cert);
res.send(cert_pem);
//fs.writeFileSync("client-crt.pem",cert_pem);
   // console.log(req.body.csr);
   // res.send('success');
    // res.download(filePath, fileName); 
});


var options = { 
    key: fs.readFileSync(keyPath+'/server-key.pem'), 
    cert: fs.readFileSync(keyPath+'/server-crt.pem'), 
    ca: fs.readFileSync(keyPath+'/ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: false
}; 

// http.createServer(app).listen(8080);
https.createServer(options, app).listen(4444);
