const SaveKeywordService = require('../../services/admin.services/keyword.service')

// 키워드는 검색어시 걸러내는 역할
class SaveKeywordController {

    saveKeywordService = new SaveKeywordService();

    saveKeywords = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            const saveKeywordResult = await this.saveKeywordService.saveKeywords(keyword);
            res.status(200).json({ message: 'Keywords saved successfully', data: saveKeywordResult });

        }catch (err) {
            console.error(err);
            next(err)
        };
    };

    getKeywords = async (req, res, next) => {
        try {
            const keywords = await this.saveKeywordService.getKeywords();
            res.status(200).json({ message: 'Get Keywords successfully', keywords });
            
        }catch (err) {
            console.error(err);
            next(err)
        };
    }
      
    deleteKeyword = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            await this.saveKeywordService.deleteKeyword(keyword);
            res.status(200).json({ message: `${keyword} delete Keyword successfully`});

        }catch (err) {
            console.error(err);
            next(err)
        };
    }

    editKeywords = async (req, res, next) => {
        try {
            const { keywordId, keyword } = req.body;
            await this.saveKeywordService.editKeywords(keywordId, keyword);
            res.status(200).json({ message: `${keyword} edit Keyword successfully`});

        }catch (err) {
            console.error(err);
            next(err)
        };
    }


};

module.exports = SaveKeywordController;