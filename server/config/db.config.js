// connection settings to DataBase
module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'root',
    DB: 'npcirs',
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
};