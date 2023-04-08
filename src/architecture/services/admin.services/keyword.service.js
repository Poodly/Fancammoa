const KeywordRepository = require('../../repositories/admin.repositories/keyword.repository')

// 키워드는 검색어시 걸러내는 역할
class SaveKeywordService {

    keywordRepository = new KeywordRepository();

    saveKeywords = async (keyword) => {
        try {
            const keywordArr = keyword.split(',');

            let result = [];
            for (let i = 0; i < keywordArr.length; i++) {
                const keyword = keywordArr[i].replace(/[^a-zA-Z0-9가-힣]/g, '');
                const exKeyword = await this.keywordRepository.findKeyword(keyword);

                if (!exKeyword) {
                    result.push(keyword);
                    await this.keywordRepository.createKeyword(keyword);

                }else {
                    console.log(`${keyword} 키워드가 이미 존재합니다.`);
                }
            }
            return result;

        }catch (error) {
            console.error(error);
            throw new Error('키워드 저장 실패');
        }
    };

    getKeywords = async () => {
        try {
            const keywords = await this.keywordRepository.getKeywords();
            return keywords
            
        }catch (error) {
            console.error(error);
            throw new Error('키워드 전체 조회 실패');
        }
    };
      
    deleteKeyword = async (keyword) => {
        try {
            await this.keywordRepository.deleteKeyword(keyword);

        }catch (error) {
            console.error(error);
            throw new Error('키워드 개별 삭제 실패');
        }
    };

    editKeywords = async (keywordId, keyword) => {
        try {
            await this.keywordRepository.editKeywords(keywordId, keyword);

        }catch (error) {
            console.error(error);
            throw new Error('키워드 개별 수정 실패');
        }
    }


};

module.exports = SaveKeywordService;