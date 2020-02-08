const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const config = require('./config/database');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
// const user = User.create();

const plain = '12345';
const password = bcrypt.hashSync(plain, 10);



User.create({ username: 'stevenlam123@yahoo.com.hk',password}, function (err, small) {
  if (err) console.log(err);
});


passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if(!user || (user && !user.verifyPassword(password))){
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
      done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


app.get('/', (req, res) => res.send('logined'));
app.get('/login', (req, res) => res.send('Invalid username or password'));
app.post('/login',
passport.authenticate('local'),
  function(req, res) {
    console.log(req.user);
    res.send('logined');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))