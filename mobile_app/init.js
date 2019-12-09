const axios = require('axios');
const fs = require('fs');

const keyPath = 'keys/';
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const baseUrl = 'https://localhost:4444/';
const apiPath = 'download_ca_cert';
const url = baseUrl + apiPath;
axios({
    method: "get",
    url: url,
    responseType: "stream"
}).then(function (response) {
    const dest = keyPath + 'ca-crt.pem';
    response.data.pipe(fs.createWriteStream(dest));
}).catch(error => {  
    console.log(error); 
});
