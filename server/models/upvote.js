const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('upvote', {
    account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    jam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jam',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'upvote',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "upvote_pkey",
        unique: true,
        fields: [
          { name: "account" },
          { name: "jam" },
        ]
      },
    ]
  });
};
