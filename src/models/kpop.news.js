const Sequelize = require("sequelize");

// Idol data table
class KpopNews extends Sequelize.Model {
    static initiate(sequelize) {
        KpopNews.init({
            newsId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            newsLink: {
                type          : Sequelize.STRING,
                allowNull     : true,
                unique        : false
            },
            newsImg: {
                type          : Sequelize.TEXT,
                allowNull     : true,
                unique        : false
            },
            newsTitle: {
                type          : Sequelize.STRING,
                allowNull     : true,
                unique        : false
            },
            press: {
                type          : Sequelize.STRING,
                allowNull     : true,
                unique        : false
            },
            newsDate: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : false
            },
            newsType: {
                type          : Sequelize.ENUM('Top3', 'Other'),
                defaultValue  : 'Other',
                unique        : false
            },
            createdAt: {
                type: Sequelize.DATE(3),  // 밀리초까지
                defaultValue: Sequelize.NOW,
                allowNull: false,
            }
        }, { // options
            sequelize,
            timestamps  : false,
            underscored : false,
            paranoid    : false,
            modelName   : "KpopNews",
            tableName   : "kpopNews",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = KpopNews;