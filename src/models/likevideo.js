const Sequelize = require("sequelize");
// const User = require('./user')

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
            // userId와 관계
            userId: {
                type          : Sequelize.INTEGER,
                allowNull     : false,
                references : {
                  model    : 'users',
                  key      : 'userId'
                },
            }
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
    // userId와 관계
    static associate(db) { 
        db.LikeVideo.belongsTo(db.User); 
    }
};

module.exports = LikeVideo;