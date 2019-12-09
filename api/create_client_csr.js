var forge = require('node-forge');
var fs = require('fs');
var rsa = forge.pki.rsa;
var pki = forge.pki;


const privateKeyPem = fs.readFileSync("client-private.pem");
const publicKeyPem = fs.readFileSync("client-public.pem");


const privateKey = pki.privateKeyFromPem(privateKeyPem);
const publicKey = pki.publicKeyFromPem(publicKeyPem);


var csr = forge.pki.createCertificationRequest();
csr.publicKey = publicKey;

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
  csr.sign(privateKey);
   
  // verify certification request
  var verified = csr.verify();
   console.log(verified);
  // convert certification request to PEM-format
  var csrPem = forge.pki.certificationRequestToPem(csr);

  fs.writeFileSync("client-csr.pem",csrPem);
