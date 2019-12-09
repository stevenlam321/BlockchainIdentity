var forge = require('node-forge');
var fs = require('fs');
var rsa = forge.pki.rsa;
var pki = forge.pki;

const caCertPem = fs.readFileSync("ca-crt.pem");
var caCert = forge.pki.certificateFromPem(caCertPem);
// console.log(caCert);
const csrPem = fs.readFileSync("client-csr.pem");
// convert a Forge certification request from PEM-format
var csr = forge.pki.certificationRequestFromPem(csrPem);
 
// get an attribute
const a = csr.getAttribute({name: 'challengePassword'});
 
// get extensions array
const b = csr.getAttribute({name: 'extensionRequest'}).extensions;

// console.log(a);
// console.log(b);

var cert = pki.createCertificate();
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
const caPrivateKeyPem = fs.readFileSync("ca-key.pem");


var privateKey = pki.decryptRsaPrivateKey(caPrivateKeyPem, 'password');

cert.sign(privateKey);
// convert a Forge certificate to PEM
var cert_pem = pki.certificateToPem(cert);
fs.writeFileSync("client-crt.pem",cert_pem);