var forge = require('node-forge');
var fs = require('fs');
const keyPath = 'keys/';
const clientPrivateKeyPath = keyPath + 'client-private.pem';
const clientPublicKeyPath = keyPath + 'client-public.pem';
var rsa = forge.pki.rsa;
var pki = forge.pki;
var keys = forge.pki.rsa.generateKeyPair(2048);

const privateKey = keys.privateKey;
const publicKey = keys.publicKey;

var privateKeyPem = forge.pki.privateKeyToPem(privateKey);
fs.writeFileSync(clientPrivateKeyPath,privateKeyPem);
var publicKeyPem = forge.pki.publicKeyToPem(publicKey);
fs.writeFileSync(clientPublicKeyPath,publicKeyPem);