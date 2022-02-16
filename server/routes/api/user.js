const router = require('express').Router();
const passport = require('passport');
const isAuth = require('../../auth-middleware/index').isAuth;
const crypto = require('crypto');
const models = require('../../models/index').models;
const uuid = require('uuid');
const mediaFolder = 'media/';
const Op = require('sequelize').Op;

router.get('/current',
    isAuth,
    async (req, res, next) => {
        var userObj = await models.account.findOne({
            where: { id: req.user.id }, raw: true
        }).catch(next)
        if (!userObj) {
            res.status(401).send();
            return;
        }
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
        const userId = req.query.userID;
        const allJams = await models.jam.findAll({ where: { creator: userId } })
            .catch(next)
        const allJamIDs = allJams.map(x => x.id);
        res.status(200).send(allJamIDs);
    }
);
router.post('/',
    isAuth,
    async (req, res, next) => {
        if (req.files != null) {
            if (req.files.profilePicture) {
                const splitFileName = req.files.profilePicture.name.split('.');
                const fileExtension = "." + splitFileName[splitFileName.length - 1];
                const fileName = uuid.v4() + fileExtension;
                await req.files.profilePicture.mv(mediaFolder + fileName);

                console.log(req.user.id);
                const asd = await models.account.update(
                    { profilepicturepath: fileName },
                    {
                        where: {
                            id: req.user.id
                        }
                    }).catch(next);
                console.log(asd)
            }
        }

        if (req.body.bio) {
            await models.account.update(
                { bio: req.body.bio },
                {
                    where: {
                        id: req.user.id
                    }
                }).catch(next)
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
        }).catch(next)
        if (hashedOldPasswordClient != user.password) {
            res.status(400).send();
        }

        await models.account.update(
            { password: hashedNewPassword },
            {
                where: { id: req.user.id }
            })
            .catch(next)

        res.status(200).send();
    }
)

router.get('/:id',
    isAuth,
    async (req, res, next) => {
        var userObj = await models.account.findOne({
            where: { id: req.params.id }, raw: true
        }).catch(next)
        if (!userObj) {
            res.status(404).send();
            return;
        }
        delete userObj.password;
        delete userObj.email;
        res.status(200).send(userObj);
    }
);

router.get('/',
    isAuth,
    async (req, res, next) => {
        const usernamePattern = '%' + req.query.usernamePattern + '%';
        var userObjects = await models.account.findAll({
            where: {
                username: {
                    [Op.iLike]: usernamePattern
                }
            },
            raw: true,
            limit: 5
        }).catch(next)
        if (!userObjects) {
            res.status(404).send();
            return;
        }
        for (let i = 0; i < userObjects.length; i++) {
            delete userObjects[i].password;
            delete userObjects[i].email;
        }
        res.status(200).send(userObjects);
    }
);

module.exports = router;