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
                        include: [{ model: models.rawrecording, required: true, as: 'recording_rawrecording' },
                        { model: models.jam, required: true, as: 'jam_jam' }]
                    },

                ]
            }).catch(next)
        res.status(200).send(jamObject);
    }
);

router.get('/all',
    isAuth,
    async (req, res, next) => {
        const allJams = await models.jam.findAll({
            raw: true
        })
            .catch(next)
        const allJamIDs = allJams.map(x => x.id).reverse();
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
        const jamId = req.body.jamID;
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
            res.status(400).send("Thumbnail or Recording wasn't sent.");
            return;
        }
        if (req.body.recordinginfos.length < 1) {
            res.status(400).send("No recording infos given.");
            return;
        }
        const recordingInfos = JSON.parse(req.body.recordinginfos);

        const splitThumbnailFileName = req.files.thumbnail.name.split('.');
        const thumbnailFileExtension = "." + splitThumbnailFileName[splitThumbnailFileName.length - 1];
        const thumbnailFileName = uuid.v4() +
            thumbnailFileExtension;
        const splitRawRecordingFileName = req.files.rawrecording.name.split('.');
        const rawRecordingFileExtension = "." + splitRawRecordingFileName[splitRawRecordingFileName.length - 1];
        const rawRecordingFileName = uuid.v4() +
            rawRecordingFileExtension;

        const transaction = await sequelize.transaction();
        try {
            const newJamCreated = await models.jam.create(
                {
                    creator: req.user.id,
                    prejam: req.body.preJamID,
                    thumbnailpath: thumbnailFileName,
                    creationdate: new Date(),
                    title: req.body.title,
                    description: req.body.description
                }, { transaction: transaction });
            const newJam = newJamCreated.get({ plain: true })
            const newRawRecordingCreated = await models.rawrecording.create({
                recordingpath: rawRecordingFileName
            }, { transaction: transaction });
            const newRawRecording = newRawRecordingCreated.get({ plain: true })
            let recordingInfoForNewJamFound = false;
            for (let i = 0; i < recordingInfos.length; i++) {
                const recordingInfo = recordingInfos[i];
                recordingInfo.jam = newJam.id;
                if (!recordingInfo.id) {
                    if (recordingInfoForNewJamFound)
                        throw 'More than one recordingInfo had no id';
                    recordingInfoForNewJamFound = true;
                    recordingInfo.recording = newRawRecording.id;
                    await models.recordinginfos.create(recordingInfo, { transaction: transaction });
                    continue;
                }
                delete recordingInfo.id;
                await models.recordinginfos.create(recordingInfo, { transaction: transaction });
            }
            if (!recordingInfoForNewJamFound)
                throw 'There was no recordinginfo with no id'

            await req.files.thumbnail.mv(mediaFolder + thumbnailFileName);
            await req.files.rawrecording.mv(mediaFolder + rawRecordingFileName);

            transaction.commit();
        }
        catch (error) {
            console.log(error)
            await transaction.rollback();
            res.status(500).send();
        }
        res.status(201).send();
    });

module.exports = router;