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
    // IdolRankScore과 관계
    static associate(db) { 
        db.IdolData.hasOne(db.IdolRankScore, { foreignKey: 'idolId' }); 
        // db.User.hasMany(db.SomeOtherModel); // 다른 모델과의 관계 설정 추가
    }
};

module.exports = IdolData;