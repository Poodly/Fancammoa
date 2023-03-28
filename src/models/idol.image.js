const Sequelize = require("sequelize");

// Idol data table
class IdolImage extends Sequelize.Model {
    static initiate(sequelize) {
        IdolImage.init({
            img: {
                type          : Sequelize.STRING,
                allowNull     : true,
                unique        : false
            },
        }, { // options
            sequelize,
            timestamps  : true,
            underscored : false,
            paranoid    : false,
            modelName   : "IdolImage",
            tableName   : "idolImages",
            charset     : "utf8",
            collate     : "utf8_general_ci",
        });
    }
    // IdolData 관계
    static associate(db) { 
        db.IdolImage.belongsTo(db.IdolData, { foreignKey: 'idolId' }); 
    }
};

module.exports = IdolImage;