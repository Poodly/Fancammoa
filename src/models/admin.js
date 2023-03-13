const Sequelize = require("sequelize");
require("dotenv").config();
const env = process.env;

// Admin table
class Admin extends Sequelize.Model {
    static initiate(sequelize) {
        Admin.init({
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
            Phone: {
                type          : Sequelize.STRING,
                allowNell     : false,
            },
            userImg: {
                type          : Sequelize.STRING,
                allowNell     : true,
            },
            userTypeKey: {
                type          : Sequelize.STRING,
                defaultValue  : env.ADMINKEY,
                allowNell     : false,
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "Admin",
            tableName   : "admin",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = Admin;