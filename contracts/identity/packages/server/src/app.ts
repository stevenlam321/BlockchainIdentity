import * as express from 'express';
import * as bodyParser from 'body-parser';
import { port as serverPort,mongodbConnection } from './env';
import * as createError  from 'http-errors';
import * as mongoose from 'mongoose';
// const User = require('./models/user');

import { AttributeExpressController,OrganizationExpressController,PersonExpressController,CredentialExpressController } from './controllers';

// import * as expressValidator from 'express-validator';

const app = express();
const port = serverPort;

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '40mb'
}));
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '40mb' }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/attributes', AttributeExpressController);
app.use('/organizations', OrganizationExpressController);
app.use('/persons', PersonExpressController);
app.use('/credentials', CredentialExpressController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var response:any = {
    message:err.message
  };
  if(err.errors){
      response.errors = err.errors;
  }
  res.json(response);
});

mongoose.connect(mongodbConnection, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

//  User.find({}, function (err, users) {
//   if (err) console.log(err);
//   console.log(users);
// });

app.listen(port, () =>
  console.log(`Server started in port ${port}`));

module.exports = app;
