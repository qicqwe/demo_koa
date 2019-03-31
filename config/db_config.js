/**
 * @author maqiao
 * @date 2019/3/28 14:45
 */
const Sequelize = require('sequelize');
const dbConfig  = {
    database: 'ynhx_xa',
    username: 'sa',
    password: 'root',
    host: '192.168.123.103',
    dialect: 'mysql',
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    // 设置时区
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
