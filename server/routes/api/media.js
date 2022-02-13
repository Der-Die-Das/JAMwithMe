const router = require('express').Router();
const isAuth = require('../../auth-middleware/index').isAuth;
const mediaFolder = 'media/';
const resolve = require('path').resolve

router.get('/:path',
    // isAuth,
    async (req, res, next) => {
        const filename = req.params.path;
        res.sendFile(resolve(mediaFolder + filename));
    });

module.exports = router;