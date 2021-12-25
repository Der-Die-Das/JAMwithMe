const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  operatorsAliases,
  host: process.env.DB_HOST,
  dialect: 'postgres'
});
const initModels = require("./init-models");
const models = initModels(sequelize);

module.exports = { models, sequelize };