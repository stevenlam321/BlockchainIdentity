const express = require('express')
const app = express()
const port = 3000
var passport = require('passport');
var ClientCertStrategy = require('passport-client-cert').Strategy;

app.get('/', (req, res) => res.send('Hello World! fuck'))

// passport.use(new ClientCertStrategy(function(clientCert, done) {
//     var cn = clientCert.subject.cn,
//         user = null;
  
//     // The CN will typically be checked against a database
//     if(cn === 'test-cn') {
//       user = { name: 'Test User' }
//     }
  
//     done(null, user);
//   }));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))