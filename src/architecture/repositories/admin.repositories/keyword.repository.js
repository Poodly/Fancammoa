const { Keyword } = require('../../../models')

// 키워드는 검색어시 걸러내는 역할
class KeywordRepository {

    createKeyword = async (keyword) => {
        try {
            const createKeyword = await Keyword.create({ keyword });               
            return createKeyword

        } catch (error) {
            console.error(error);
            next();
        }
    };

    findKeyword = async (keyword) => {
        try {
            const exKeyword = await Keyword.findOne({ where: { keyword } });               
            return exKeyword

        } catch (error) {
            console.error(error);
            next();
        }
    };

    getKeywords = async () => {
        try {
            const keywords = await Keyword.findAll({});
            return keywords
            
        } catch (error) {
            console.error(error);
            next();
        }
    }
      
    deleteKeyword = async (keyword) => {
        try {
            await Keyword.destroy({ where: { keyword } });

        } catch (error) {
            console.error(error);
            next();
        }
    }

    editKeywords = async (keywordId, keyword) => {
        try {
            await Keyword.update({ keyword }, { where: { keywordId } });

        } catch (error) {
            console.error(error);
            next();
        }
    }
};

module.exports = KeywordRepository;