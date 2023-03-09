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
    // likeVideo와 관계
    static associate(db) { 
        db.User.hasMany(db.LikeVideo); 
        // db.User.hasMany(db.SomeOtherModel); // 다른 모델과의 관계 설정 추가
    }
};

module.exports = User;