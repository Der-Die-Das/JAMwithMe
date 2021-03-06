const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rawrecording', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    recordingpath: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rawrecording',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rawrecording_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
