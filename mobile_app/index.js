// // const express = require('express')
// // const app = express()
// // const port = 3001

// // app.get('/download', (req, res) => {
    
// // });

// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//  const axios = require('axios');
 var fs = require('fs');

// axios.get('http://localhost:3000/download')
//   .then(response => {
//     var file = fs.createWriteStream('./ca-crt.pem');
//     response.data.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);
//     });
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });


// const Path = require('path')  
// const Axios = require('axios')

// async function downloadImage () {  
//   const url = 'http://localhost:3000/download'
//   const path = 'ca-crt.pem';
//   const writer = fs.createWriteStream(path)

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   })

//   response.data.pipe(writer)

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   })
// }

// downloadImage()  
var https = require('https'); 
var options = { 
    hostname: 'localhost', 
    port: 4444, 
    path: '/', 
    method: 'GET', 
    key: fs.readFileSync('client-private.pem'), 
    cert: fs.readFileSync('client-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem') 
}; 
var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
}); 
req.end();