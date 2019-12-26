const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        console.log(err);
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
      console.log(user);
      done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    console.log("de"+user);
    done(null, user);
  });


  
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('Hello World!');
});
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send('logined');
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))