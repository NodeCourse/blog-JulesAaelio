const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(User) {
    passport.use(new LocalStrategy((email, password, done) => {
        User
            .findOne({
                where : { email }
            }).then(function (user) {
                bcrypt.compare(password,user.password).then(r=> {
                    if(r) {
                        return done(null, user)
                    }else {
                        return done(null, false, {
                            message: 'Invalid credentials'
                        });
                    }
                });
            })
            // If an error occured, report it
            .catch(done);
    }));

    // Save the user's email address in the cookie
    passport.serializeUser((user, cookieBuilder) => {
        cookieBuilder(null, user.email);
    });

    passport.deserializeUser((email, cb) => {
        console.log("AUTH ATTEMPT",email);
        // Fetch the user record corresponding to the provided email address
        User.findOne({
            where : { email }
        }).then(r => {
            if(r) return cb(null, r);
            else return cb(new Error("No user corresponding to the cookie's email address"));
        });
    });
    return passport;
}
module.exports = init;