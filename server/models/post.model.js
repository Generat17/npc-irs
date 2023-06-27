module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });

    return Post;
};