const router = require('express').Router();
const isAuth = require('../../auth-middleware/index').isAuth;
const models = require('../../models/index').models;

router.post('/request',
    isAuth,
    async (req, res, next) => {
        var loggedInUser = req.user.id;
        var otherUser = req.body.userID;
        if (loggedInUser == otherUser) {
            res.status(400).send('You can not add yourself as a friend.')
            return;
        }
        try {
            var friendObj = await returnFriendObjectIfExists(loggedInUser, otherUser);
            if (friendObj == null) {
                createFriendObject(loggedInUser, otherUser);
                res.status(201).send();
            }
            else {
                acceptFriendRequest(friendObj, loggedInUser);
                res.status(200).send();
            }
        } catch (error) {
            next(error);
        }
    }
);

router.post('/unfriend',
    isAuth,
    async (req, res, next) => {
        var loggedInUser = req.user.id;
        var otherUser = req.body.userID;
        var friendObject = await returnFriendObjectIfExists(loggedInUser, otherUser);
        if (friendObject == null) {
            res.status(404).send('No Friend Object found.');
            return;
        }
        if (friendObject.accountid1 == loggedInUser) {
            await models.friends.update({ account1accepted: false }, {
                where: {
                    accountid1: friendObject.accountid1, accountid2: friendObject.accountid2
                }
            }).catch(next)
        } else {
            await models.friends.update({ account2accepted: false }, {
                where: {
                    accountid1: friendObject.accountid1, accountid2: friendObject.accountid2
                }
            }).catch(next)
        }
        res.status(200).send();
    }
);

async function returnFriendObjectIfExists(user1, user2) {
    var friendObject = await models.friends.findOne({ where: { accountid1: user1, accountid2: user2 } });
    if (friendObject == null) {
        friendObject = await models.friends.findOne({ where: { accountid1: user2, accountid2: user1 } });
    }
    return friendObject;
}

async function createFriendObject(requestingUser, requestedUser) {
    models.friends.create({ accountid1: requestingUser, accountid2: requestedUser, account1accepted: true, account2accepted: false })
}

async function acceptFriendRequest(friendObj, requestingUser) {
    if (friendObj.accountid1 == requestingUser) {
        await models.friends.update({ account1accepted: true }, {
            where: {
                accountid1: friendObj.accountid1, accountid2: friendObj.accountid2
            }
        });
    } else {
        await models.friends.update({ account2accepted: true }, {
            where: {
                accountid1: friendObj.accountid1, accountid2: friendObj.accountid2
            }
        });
    }
}

module.exports = router;