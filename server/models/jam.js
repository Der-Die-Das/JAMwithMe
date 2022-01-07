const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jam', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    prejam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'jam',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'jam',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jam_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};