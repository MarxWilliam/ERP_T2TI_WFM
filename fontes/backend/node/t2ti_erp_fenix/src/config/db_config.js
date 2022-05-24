const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/sequelize_config.js');
//const { sequelize } = require('sequelize');

const sequelize = new Sequelize(sequelizeConfig);

sequelize
  .authenticate()
  .then(() => {
        console.log('Conexão estabelecida com sucesso usando o sequelize.');
  })
  .catch(err => {
        console.error('Problemas ao estabelecer a conexão usando o sequelize: ', err);
    });

module.exports = sequelize;

/*
// Não utiliza o sequelize

const mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: 3306,
    useSSL: false,
    timezone: 'UTC',
    user: 'root',
    password: 'Practicing999',
    database: 'fenix',
    insecureAuth : true
});

module.exports = connection;
*/