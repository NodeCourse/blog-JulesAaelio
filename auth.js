const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function init(User) {
    passport.use(new LocalStrategy((email, password, done) => {
        User
            .findOne({
                where : { email }
            }).then(function (user) {
                if (!user || !user.validPassword(password)) {
                    // User not found or an invalid password has been provided
                    console.log('TAMERE');
                    return done(null, false, {
                        message: 'Invalid credentials'
                    });
                }
                // User found
                return done(null, user);
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
            email
        }).then(r => {
            console.log(r);
        });
        // return cb(new Error("No user corresponding to the cookie's email address"));

        // return cb(null, JANE_DOE);
    });
    return passport;
}
module.exports = init;