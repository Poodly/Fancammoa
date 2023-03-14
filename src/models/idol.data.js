const Sequelize = require("sequelize");

// Idol data table
class IdolData extends Sequelize.Model {
    static initiate(sequelize) {
        IdolData.init({
            idolId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            idolName: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "IdolData",
            tableName   : "idolDatas",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = IdolData;