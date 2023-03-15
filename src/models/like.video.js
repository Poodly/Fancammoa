const Sequelize = require("sequelize");
// const User = require('./user')

// User lkie video table
class LikeVideo extends Sequelize.Model {
    static initiate(sequelize) {
        LikeVideo.init({
            //userId와 관계
            // userId: {
            //     type          : Sequelize.INTEGER,
            //     primaryKey    : true,
            //     autoIncrement : true,
            //     references : {
            //         model    : 'users',
            //         key      : 'userId'
            //     },
            // },
            videoId: {
                type          : Sequelize.STRING,
                allowNull     : true,
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
    // userId와 관계
    static associate(db) { 
        db.LikeVideo.belongsTo(db.User, { foreignKey: 'userId' }); 
    }
};

module.exports = LikeVideo;