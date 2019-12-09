var forge = require('node-forge');
var fs = require('fs');
const axios = require('axios');
var rsa = forge.pki.rsa;
var pki = forge.pki;

const keyPath = 'keys/';
const clientPrivateKeyPath = keyPath + 'client-private.pem';
const clientPublicKeyPath = keyPath + 'client-public.pem';
const clientCertPath = keyPath + 'client-crt.pem';


const privateKeyPem = fs.readFileSync(clientPrivateKeyPath);
const publicKeyPem = fs.readFileSync(clientPublicKeyPath);


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
  // var verified = csr.verify();
  // convert certification request to PEM-format
  var csrPem = forge.pki.certificationRequestToPem(csr);
//console.log(csrPem);

//fs.writeFileSync("client-csr.pem",csrPem);
const baseUrl = 'https://localhost:4444/';
const apiPath = 'register';
const url = baseUrl + apiPath;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
axios({
    method: "POST",
    url: url,
    data: {
      csr: csrPem
    }
}).then(function (res) {
  fs.writeFileSync(clientCertPath,res.data);
  // console.log(res.data);
}).catch(error => {  
    console.log(error); 
});


