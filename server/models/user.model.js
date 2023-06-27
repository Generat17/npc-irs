module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        coefficient: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    });

    return User;
};