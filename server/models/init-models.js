var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _comment = require("./comment");
var _friends = require("./friends");
var _jam = require("./jam");
var _rawrecording = require("./rawrecording");
var _recordinginfos = require("./recordinginfos");
var _upvote = require("./upvote");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var friends = _friends(sequelize, DataTypes);
  var jam = _jam(sequelize, DataTypes);
  var rawrecording = _rawrecording(sequelize, DataTypes);
  var recordinginfos = _recordinginfos(sequelize, DataTypes);
  var upvote = _upvote(sequelize, DataTypes);

  account.belongsToMany(account, { as: 'accountid2_accounts', through: friends, foreignKey: "accountid1", otherKey: "accountid2" });
  account.belongsToMany(account, { as: 'accountid1_accounts', through: friends, foreignKey: "accountid2", otherKey: "accountid1" });
  account.belongsToMany(jam, { as: 'jam_jams', through: upvote, foreignKey: "account", otherKey: "jam" });
  jam.belongsToMany(account, { as: 'account_accounts', through: upvote, foreignKey: "jam", otherKey: "account" });
  comment.belongsTo(account, { as: "creator_account", foreignKey: "creator"});
  account.hasMany(comment, { as: "comments", foreignKey: "creator"});
  friends.belongsTo(account, { as: "accountid1_account", foreignKey: "accountid1"});
  account.hasMany(friends, { as: "friends", foreignKey: "accountid1"});
  friends.belongsTo(account, { as: "accountid2_account", foreignKey: "accountid2"});
  account.hasMany(friends, { as: "accountid2_friends", foreignKey: "accountid2"});
  jam.belongsTo(account, { as: "creator_account", foreignKey: "creator"});
  account.hasMany(jam, { as: "jams", foreignKey: "creator"});
  upvote.belongsTo(account, { as: "account_account", foreignKey: "account"});
  account.hasMany(upvote, { as: "upvotes", foreignKey: "account"});
  comment.belongsTo(jam, { as: "jam_jam", foreignKey: "jam"});
  jam.hasMany(comment, { as: "comments", foreignKey: "jam"});
  jam.belongsTo(jam, { as: "prejam_jam", foreignKey: "prejam"});
  jam.hasMany(jam, { as: "jams", foreignKey: "prejam"});
  recordinginfos.belongsTo(jam, { as: "jam_jam", foreignKey: "jam"});
  jam.hasMany(recordinginfos, { as: "recordinginfos", foreignKey: "jam"});
  upvote.belongsTo(jam, { as: "jam_jam", foreignKey: "jam"});
  jam.hasMany(upvote, { as: "upvotes", foreignKey: "jam"});
  recordinginfos.belongsTo(rawrecording, { as: "recording_rawrecording", foreignKey: "recording"});
  rawrecording.hasMany(recordinginfos, { as: "recordinginfos", foreignKey: "recording"});

  return {
    account,
    comment,
    friends,
    jam,
    rawrecording,
    recordinginfos,
    upvote,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
