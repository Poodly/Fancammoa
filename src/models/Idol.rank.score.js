const Sequelize = require("sequelize");

// Idol data table
class IdolRankScore extends Sequelize.Model {
    static initiate(sequelize) {
        IdolRankScore.init({
            youtubeScore: {
                type          : Sequelize.TEXT,
                defaultValue  : 0,
                allowNull     : true,
            },
            instaScore: {
                type          : Sequelize.TEXT,
                defaultValue  : 0,
                allowNull     : true,
            },
            spotifyScore: {
                type          : Sequelize.TEXT,
                defaultValue  : 0,
                allowNull     : true,
            },
            googleScore: {
                type          : Sequelize.TEXT,
                defaultValue  : 0,
                allowNull     : true,
            },
            overallScore: {
                type          : Sequelize.TEXT,
                defaultValue  : 0,
                allowNull     : true,
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "IdolRankScore",
            tableName   : "idolRankScores",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
    // userId와 관계
    static associate(db) { 
        db.IdolRankScore.belongsTo(db.IdolData, { foreignKey: 'idolId' }); 
    }
};

module.exports = IdolRankScore;