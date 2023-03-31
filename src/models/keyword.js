const Sequelize = require("sequelize");

// Idol data table
class Keyword extends Sequelize.Model {
    static initiate(sequelize) {
        Keyword.init({
            keywordId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            keyword: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "Keyword",
            tableName   : "keywords",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = Keyword;