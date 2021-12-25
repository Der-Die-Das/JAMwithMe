const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recordinginfos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jam',
        key: 'id'
      }
    },
    recording: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rawrecording',
        key: 'id'
      }
    },
    volume: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bass: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    middle: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    treble: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recordinginfos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recordinginfos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
