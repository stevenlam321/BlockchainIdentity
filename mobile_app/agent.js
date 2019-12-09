const https = require('https');
const fs = require('fs');
const path = require('path');

const keyPath = 'keys/';
const clientPrivateKeyPath = keyPath + 'client-private.pem';
const clientCertPath = keyPath + 'fake-pem.pem';
const caCertPath = keyPath + 'ca-crt.pem';

// For more `https.Agent` options, see here:
// https://nodejs.org/api/https.html#https_https_request_options_callback

module.exports = function () {
	return new https.Agent({
		cert: fs.readFileSync(clientCertPath),
		key: fs.readFileSync(clientPrivateKeyPath),
		ca: [fs.readFileSync(caCertPath)],
		rejectUnauthorized: false
	});
};
