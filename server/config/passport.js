var LocalStrategy = require('passport-local').Strategy;
const models = require("../models/index").models;
var crypto = require('crypto');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        models.account.findAll({
            where: {
                id: id
            }
        }).then((users) => {
            if (!users.length || users == undefined)
                done(null, false);
            done(null, users[0])
        }).catch((err) => {
            done(err);
        })
    });

    passport.use('local-register', new LocalStrategy({
        passReqToCallback: true
    },
        (req, username, password, done) => {
            models.account.findAll({
                where: {
                    username: username
                }
            }).then((users) => {
                if (users.length)
                    return done(null, false);

                var hashedPassword = crypto.createHash('md5').update(password).digest('hex');

                models.account.create({
                    username: username,
                    password: hashedPassword,
                    email: req.body.email
                })
                    .then((newUser) => {
                        return done(null, newUser);
                    })
                    .catch((err) => {
                        return done(err);
                    })
            })
                .catch((err) => {
                    return done(err);
                })
        }
    ));

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
        (req, username, password, done) => {
            models.account.findAll({
                where: {
                    username: username
                }
            }).then((users) => {
                if (!users.length || users == undefined)
                    return done(null, false);

                var hashedClientPassword = crypto.createHash('md5').update(password).digest('hex');
                console.log(hashedClientPassword);
                if (hashedClientPassword == users[0].password) {
                    return done(null, users[0]);
                }
                return done(null, false);
            })
                .catch((err) => {
                    done(err);
                })
        }));
};