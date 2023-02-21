const Sequelize = require("sequelize");

// Admin table
class Admin extends Sequelize.Model {
    static initiate(sequelize) {
        Admin.init({
            adminId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            adminEmail: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true,
            },
            adminNick: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true
            },
            adminPw: {
                type          : Sequelize.STRING,
                allowNell     : false,
            },
            adminPhone: {
                type          : Sequelize.STRING,
                allowNell     : false,
            },
            adminImg: {
                type          : Sequelize.STRING,
                allowNell     : true,
            }
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