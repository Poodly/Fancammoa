const SaveKeywordService = require('../../services/admin.services/keyword.service')

// 키워드는 검색어시 걸러내는 역할
class SaveKeywordController {

    saveKeywordService = new SaveKeywordService();

    saveKeywords = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            const saveKeywordResult = await this.saveKeywordService.saveKeywords(keyword);
            res.status(200).json({ message: 'Keywords saved successfully', data: saveKeywordResult });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };

    getKeywords = async (req, res, next) => {
        try {
            const keywords = await this.saveKeywordService.getKeywords();
            res.status(200).json({ message: 'Get Keywords successfully', keywords });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
      
    deleteKeyword = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            await this.saveKeywordService.deleteKeyword(keyword);
            res.status(200).json({ message: `${keyword} delete Keyword successfully`});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    editKeywords = async (req, res, next) => {
        try {
            const { keywordId, keyword } = req.body;
            await this.saveKeywordService.editKeywords(keywordId, keyword);
            res.status(200).json({ message: `${keyword} edit Keyword successfully`});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }


};

module.exports = SaveKeywordController;