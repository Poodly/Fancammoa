const Sequelize = require("sequelize");

// User lkie video table
class LikeVideo extends Sequelize.Model {
    static initiate(sequelize) {
        LikeVideo.init({
            videoId: {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true,
            },
            videoLink: {
                type          : Sequelize.STRING,
                allowNull     : false,
                unique        : true,
            },
            userId: {
                type          : Sequelize.INTEGER,
                allowNull     : false,
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "LikeVideo",
            tableName   : "likeVideos",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
};

module.exports = LikeVideo;