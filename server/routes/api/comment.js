const router = require('express').Router();
const isAuth = require('../../auth-middleware/index').isAuth;
const crypto = require('crypto');
const { models, sequelize } = require('../../models/index');


router.post('/create',
    isAuth,
    async (req, res, next) => {
        const jamId = req.body.jamID;
        const commentText = req.body.comment;
        const newComment = await models.comment.create({
            creator: req.user.id,
            jam: jamId,
            text: commentText
        })
            .catch(next);
        res.status(201).send(newComment);
    });

router.post('/delete',
    isAuth,
    async (req, res, next) => {
        const commentId = req.body.commentID;
        await models.comment.destroy({
            where: {
                id: commentId,
                creator: req.user.id
            }
        })
            .catch(next);
        res.status(200).send();
    });

router.get('/:id',
    isAuth,
    async (req, res, next) => {

        const commentObj = await models.comment.findOne({
            where: { id: req.params.id, },
            raw: true
        })
            .catch(next);
        if (!commentObj) {
            res.status(404).send();
            return;
        }
        res.status(200).send(commentObj);
    });

module.exports = router;