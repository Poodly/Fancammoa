const Sequelize = require("sequelize");

// User table
class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            userId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            email: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true,
            },
            nick: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true
            },
            password: {
                type          : Sequelize.STRING,
                allowNell     : false,
            },
            userImg: {
                type          : Sequelize.STRING,
                allowNell     : true,
            },
            userTypeKey: {
                type          : Sequelize.STRING,
                defaultValue  : "General",
                allowNell     : false,
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "User",
            tableName   : "users",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = User;