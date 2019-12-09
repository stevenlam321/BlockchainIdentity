var forge = require('node-forge');
var fs = require('fs');
var rsa = forge.pki.rsa;
var pki = forge.pki;
var keys = forge.pki.rsa.generateKeyPair(2048);

const privateKey = keys.privateKey;
const publicKey = keys.publicKey;

var privateKeyPem = forge.pki.privateKeyToPem(privateKey);
fs.writeFileSync("client-private.pem",privateKeyPem);
var publicKeyPem = forge.pki.publicKeyToPem(publicKey);
fs.writeFileSync("client-public.pem",publicKeyPem);