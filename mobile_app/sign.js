
const axios = require('axios');
var forge = require('node-forge');
var fs = require('fs');
const Path = require('path')  
const Axios = require('axios');

var rsa = forge.pki.rsa;
var pki = forge.pki;

var pem = fs.readFileSync("client-keytest-csr.pem", "utf-8");
var cert = pki.certificateFromPem(pem);


// cert.sign(keys.privateKey);
// var pem = pki.certificateToPem(cert);
// fs.writeFileSync("client-keytest.pem",pem);