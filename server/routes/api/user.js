const router = require('express').Router();
const passport = require("passport");
const isAuth = require("../../auth-middleware/index").isAuth;
const crypto = require('crypto');
const models = require("../../models/index").models;
const uuid = require('uuid');
const mediaFolder = "@/media/";

router.get('/:id',
    isAuth,
    async (req, res, next) => {
        var userObj = await models.account.findOne({ where: { id: req.params.id }, raw: true });
        if (!userObj) {
            res.status(404).send();
            return;
        }
        delete userObj.password;
        delete userObj.email;
        res.status(200).send(userObj);
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
router.get('/jams',
    isAuth,
    async (req, res, next) => {
        const allJams = await models.jam.findAll({ where: { creator: req.user.id } });
        const allJamIDs = allJams.map(x => x.id);
        res.status(200).send(allJamIDs);
    }
);
router.post('/',
    isAuth,
    async (req, res, next) => {
        if (req.files != null) {
            if (req.files.profilePicture) {
                const fileName = uuid.v4();
                await req.files.profilePicture.mv(mediaFolder + fileName);

                await models.account.update(
                    { profilePicturePath: fileName },
                    {
                        where: {
                            id: req.user.id
                        }
                    })
            }
        }

        if (req.body.bio) {
            await models.account.update(
                { bio: req.body.bio },
                {
                    where: {
                        id: req.user.id
                    }
                })
        }
        res.status(200).send();
    }
);

router.put('/password',
    isAuth,
    async (req, res, next) => {
        const oldPasswordClient = req.body.oldPassword;
        const hashedOldPasswordClient = crypto.createHash('md5')
            .update(oldPasswordClient).digest('hex')
        const newPassword = req.body.newPassword;
        const hashedNewPassword = crypto.createHash('md5')
            .update(newPassword).digest('hex')

        const user = await models.account.findOne({
            where: {
                id: req.user.id
            }
        });
        if (hashedOldPasswordClient != user.password) {
            res.status(400).send();
        }

        await models.account.update(
            { password: hashedNewPassword },
            { where: { id: req.user.id } });

        res.status(200).send();
    }
)


module.exports = router;