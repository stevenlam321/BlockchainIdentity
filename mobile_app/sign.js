
const axios = require('axios');
var forge = require('node-forge');
var fs = require('fs');
const Path = require('path')  
const Axios = require('axios');

//512 bits  = 64 bytes
var rsa = forge.pki.rsa;
var pki = forge.pki;
var keys = forge.pki.rsa.generateKeyPair(2048);
var publicKey = keys.publicKey;
var privateKey = keys.privateKey;
var publicKeyToPem = forge.pki.publicKeyToPem(publicKey);
var hex  = forge.util.bytesToHex(publicKeyToPem);

var md = forge.md.sha1.create();
md.update(publicKeyToPem);
console.log(md.digest().toHex());

// console.log(hex);
// console.log(publicKeyToPem);

// var pem = fs.readFileSync("keys/client-public.pem", "utf-8");

// console.log(pem);
// console.log(pem.length);
// var publicKey = pki.publicKeyFromPem(pem);
// console.log(publicKey);

var fingerPrint2 =  pki.getPublicKeyFingerprint(publicKey, {encoding: 'hex'});
// var fingerPrint = forge.ssh.getPublicKeyFingerprint(publicKey);
console.log(fingerPrint2);
// cert.sign(keys.privateKey);
// var pem = pki.certificateToPem(cert);
// fs.writeFileSync("client-keytest.pem",pem);