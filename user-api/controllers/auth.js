var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user').User;

passport.use(new BasicStrategy(
    function (username, password, next) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                next(err);
            }
            if (user == null) {
                next(null, false);
            } else {
                user.verifyPassword({ password: password }, function (err, isMatch) {
                    if (isMatch) {
                        next(null, user);
                    }
                    else {
                        next(null, false);
                    }
                });
            }
        });
    }));

exports.isAuthenticated = passport.authenticate('basic', { session: false }), function(req, res) {
    res.json(req.username);
}