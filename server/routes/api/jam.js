const router = require('express').Router();
const passport = require("passport");
const isAuth = require("../../auth-middleware/index").isAuth;
const crypto = require('crypto');
const { models, sequelize } = require("../../models/index");
const uuid = require('uuid');
const mediaFolder = "@/media/";


router.get('/',
    isAuth,
    async (req, res, next) => {
        const jamID = req.query.jamID;
        const jamObject = await models.jam.findOne(
            {
                where: { id: jamID },
                include: [
                    {
                        model: models.recordinginfos, require: true, as: "recordinginfos",
                        include: [{ model: models.rawrecording, required: true, as: "recording_rawrecording" }]
                    },

                ]
            });
        res.status(200).send(jamObject);
    }
);

router.get('/all',
    isAuth,
    async (req, res, next) => {
        const allJams = await models.jam.findAll({ raw: true });
        const allJamIDs = allJams.map(x => x.id);
        res.status(200).send(allJamIDs);
    }
)

router.get('/likes',
    isAuth,
    async (req, res, next) => {
        const jamId = req.query.jamID;
        const count = await models.upvote.count({
            where: {
                jam: jamId
            }
        });

        res.status(200).send({ jamID: jamId, likeCount: count });
    }
);

router.get('/comments',
    isAuth,
    async (req, res, next) => {
        const jamId = req.query.jamID;
        const comments = await models.comment.findAll({
            where: {
                jam: jamId
            }
        });
        res.status(200).send(comments);
    }
);

router.delete('/delete',
    isAuth,
    async (req, res, next) => {
        const jamId = req.query.jamID;
        const jamObject = await models.jam.findOne({
            where: {
                id: jamId
            }
        });
        if (jamObject.creator != req.user.id) {
            res.status(401).send();
        }
        const transaction = await sequelize.transaction();
        try {
            await models.upvote.destroy({
                where: { jam: jamId }
            })
            await models.comment.destroy({
                where: { jam: jamId }
            })
            await models.recordinginfos.destroy({
                where: { jam: jamId }
            })
            await models.jam.destroy({
                where: { id: jamId }
            })
            await transaction.commit();
        }
        catch {
            await transaction.rollback();
            res.status(500).send();
        }
        res.status(200).send();
    });


router.post('/like',
    isAuth,
    async (req, res, next) => {
        const jamId = req.body.jamID;
        const alreadyLiked = await models.upvote.findOne({
            where: {
                jam: jamId,
                account: req.user.id
            }
        })
        if (alreadyLiked) {
            res.status(400).send();
            return;
        }

        await models.upvote.create({ jam: jamId, account: req.user.id });

        res.send(201).send();
    });

router.post('/unlike',
    isAuth,
    async (req, res, next) => {
        const jamId = req.body.jamID;
        const result = await models.upvote.destroy({
            where: {
                jam: jamId,
                account: req.user.id
            }
        })
        res.status(result > 0 ? 200 : 400).send();
    });

module.exports = router;