const router = require('express').Router();
const passport = require("passport");
const isAuth = require("../../auth-middleware/index").isAuth;

router.get('/',
    isAuth,
    (req, res, next) => {
        res.send("Yay");
    }
);

router.post('/login',
    passport.authenticate('local-login', { /*failureRedirect: '/login'*/ }),
    (req, res, next) => {
        res.status(200).send();
    }
);

router.post('/register',
    passport.authenticate('local-register', { /*failureRedirect: '/register'*/ }),
    (req, res, next) => {
        res.status(201).send();
    }
);

router.post('/logout',
    isAuth,
    (req, res, next) => {
        req.logout();
        res.status(200).send();
    }
);

module.exports = router;