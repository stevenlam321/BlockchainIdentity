var https = require('https'); 
var axios = require('axios'); 
// var options = { 
//     hostname: 'localhost', 
//     port: 4444, 
//     path: '/authenticate', 
//     method: 'GET', 
//     key: fs.readFileSync('keys/client-private.pem'), 
//     cert: fs.readFileSync('keys/client-crt.pem'), 
//     ca: fs.readFileSync('keys/ca-crt.pem') 
// }; 
// var req = https.request(options, function(res) { 
//     res.on('data', function(data) { 
//         process.stdout.write(data); 
//     }); 
// }); 
// req.end();

const agent = require('./agent');

const serverUrl = 'https://localhost:4444/authenticate';
let opts = { httpsAgent: agent() };

axios.get(serverUrl, opts)
.then((res) => {
    console.log(res.data);
})
.catch((err) => {
    console.error(err.response.data);
});