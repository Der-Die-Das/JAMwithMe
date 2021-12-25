const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friends', {
    accountid1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    accountid2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    account1accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    account2accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'friends',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "friends_pkey",
        unique: true,
        fields: [
          { name: "accountid1" },
          { name: "accountid2" },
        ]
      },
    ]
  });
};
