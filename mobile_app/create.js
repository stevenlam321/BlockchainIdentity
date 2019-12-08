
const axios = require('axios');
var forge = require('node-forge');
var fs = require('fs');
const Path = require('path')  
const Axios = require('axios');

var rsa = forge.pki.rsa;
var pki = forge.pki;
// var keypair = rsa.generateKeyPair({bits: 4096});
// var publicKey = keypair.publicKey;
// var privateKey = keypair.privateKey;
// var publicKey_str = forge.pki.publicKeyToPem(publicKey);
// var privateKey_str = forge.pki.privateKeyToPem(privateKey);
// fs.writeFileSync("client-key.pem",privateKey_str);

// generate a key pair
var keys = forge.pki.rsa.generateKeyPair(4096);
 
// create a certification request (CSR)
var csr = forge.pki.createCertificationRequest();
csr.publicKey = keys.publicKey;
csr.setSubject([{
  name: 'commonName',
  value: 'example.org'
}, {
  name: 'countryName',
  value: 'US'
}, {
  shortName: 'ST',
  value: 'Virginia'
}, {
  name: 'localityName',
  value: 'Blacksburg'
}, {
  name: 'organizationName',
  value: 'Test'
}, {
  shortName: 'OU',
  value: 'Test'
}]);
// set (optional) attributes
csr.setAttributes([{
  name: 'challengePassword',
  value: 'password'
}, {
  name: 'unstructuredName',
  value: 'My Company, Inc.'
}, {
  name: 'extensionRequest',
  extensions: [{
    name: 'subjectAltName',
    altNames: [{
      // 2 is DNS type
      type: 2,
      value: 'test.domain.com'
    }, {
      type: 2,
      value: 'other.domain.com',
    }, {
      type: 2,
      value: 'www.domain.net'
    }]
  }]
}]);
 
// sign certification request
csr.sign(keys.privateKey);
var pem = forge.pki.certificationRequestToPem(csr);
fs.writeFileSync("client-keytest-csr.pem",pem);