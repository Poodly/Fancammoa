const { Keyword } = require('../../../models')

// 키워드는 검색어시 걸러내는 역할
class KeywordRepository {

    createKeyword = async (keyword) => {
        try {
            const createKeyword = await Keyword.create({ keyword });               
            return createKeyword

        }catch (error) {
            console.error(error);
            throw new Error('키워드 생성 실패');
        }
    };

    findKeyword = async (keyword) => {
        try {
            const exKeyword = await Keyword.findOne({ where: { keyword } });               
            return exKeyword

        }catch (error) {
            console.error(error);
            throw new Error('키워드 개별 조회 실패');
        }
    };

    getKeywords = async () => {
        try {
            const keywords = await Keyword.findAll({});
            return keywords
            
        }catch (error) {
            console.error(error);
            throw new Error('키워드 전체 조회 실패');
        }
    }
      
    deleteKeyword = async (keyword) => {
        try {
            await Keyword.destroy({ where: { keyword } });

        }catch (error) {
            console.error(error);
            throw new Error('키워드 개별 삭제 실패');
        }
    }

    editKeywords = async (keywordId, keyword) => {
        try {
            await Keyword.update({ keyword }, { where: { keywordId } });

        }catch (error) {
            console.error(error);
            throw new Error('키워드 개별 수정 실패');
        }
    }
};

module.exports = KeywordRepository;