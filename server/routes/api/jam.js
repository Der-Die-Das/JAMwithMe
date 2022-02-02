const router = require('express').Router();
const passport = require('passport');
const isAuth = require('../../auth-middleware/index').isAuth;
const crypto = require('crypto');
const { models, sequelize } = require('../../models/index');
const uuid = require('uuid');
const mediaFolder = 'media/';


router.get('/',
    isAuth,
    async (req, res, next) => {
        const jamID = req.query.jamID;
        const jamObject = await models.jam.findOne(
            {
                where: { id: jamID },
                include: [
                    {
                        model: models.recordinginfos, require: true, as: 'recordinginfos',
                        include: [{ model: models.rawrecording, required: true, as: 'recording_rawrecording' }]
                    },

                ]
            }).catch(next)
        res.status(200).send(jamObject);
    }
);

router.get('/all',
    isAuth,
    async (req, res, next) => {
        const allJams = await models.jam.findAll({ raw: true })
            .catch(next)
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
        }).catch(next)

        res.status(200).send({ jamID: jamId, likeCount: count });
    }
);

router.get('/liked',
    isAuth,
    async (req, res, next) => {
        const jamId = req.query.jamID;
        const alreadyLiked = await models.upvote.findOne({
            where: {
                jam: jamId,
                account: req.user.id
            }
        }).catch(next)


        res.status(200).send({ liked: alreadyLiked ? true : false });
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
        }).catch(next)
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
        }).catch(next)
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
        }).catch(next)
        if (alreadyLiked) {
            res.status(400).send();
            return;
        }

        await models.upvote.create({ jam: jamId, account: req.user.id })
            .catch(next)

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
        }).catch(next)
        res.status(result > 0 ? 200 : 400).send();
    });

router.post('/create',
    isAuth,
    async (req, res, next) => {
        if (req.files == null ||
            !req.files.thumbnail ||
            !req.files.rawrecording) {
            res.status(400).send();
            return;
        }
        if (req.body.recordinginfos.length < 1) {
            res.status(400).send();
            return;
        }
        const recordingInfos = req.body.recordinginfos;

        const thumbnailFileName = uuid.v4() + '.' +
            req.files.thumbnail.extension;
        const rawRecordingFileName = uuid.v4() + '.' +
            req.files.rawRecording.extension;;

        const transaction = await sequelize.transaction();
        try {
            const newJam = await models.jam.create(
                {
                    creator: req.user.id,
                    prejam: req.body.preJamID,
                    thumbnailPath: mediaFolder + thumbnailFileName,
                    creationDate: new Date()
                });
            const newRawRecording = await models.rawrecording.create({
                recordingpath: mediaFolder + rawRecordingFileName
            })

            let recordingInfoForNewJamFound = false;
            for (let i = 0; i < recordingInfos.length; i++) {
                const recordingInfo = recordingInfos[i];
                if (!recordingInfo.id) {
                    if (recordingInfoForNewJamFound)
                        throw 'More than one recordingInfo had no id';
                    recordingInfoForNewJamFound = true;
                    recordingInfo.jam = newJam.id;
                    recordingInfo.recording = newRawRecording.id;
                    await models.recordinginfos.create(recordingInfo);
                    continue;
                }
                await models.recordinginfos.create(recordingInfo);
            }
            if (!recordingInfoForNewJamFound)
                throw 'There was no recordinginfo with no id'

            await req.files.thumbnail.mv(mediaFolder + thumbnailFileName);
            await req.files.thumbnail.mv(mediaFolder + rawRecordingFileName);

            transaction.commit();
        }
        catch {
            await transaction.rollback();
            res.status(500).send();
        }
        res.status(201).send();
    });

module.exports = router;