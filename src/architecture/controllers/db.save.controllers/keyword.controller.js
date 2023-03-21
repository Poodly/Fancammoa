const { Keyword } = require('../../../models')

// 키워드는 검색어시 걸러내는 역할
class SaveKeywordController {

    saveKeywords = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            const keywordArr = keyword.split(',');

            let result = []
            for (let i = 0; i < keywordArr.length; i++) {

                const keyword = keywordArr[i].replace(/[^a-zA-Z0-9가-힣]/g, '');
                // console.log("keyword---------------------", keyword)
                const exKeyword = await Keyword.findOne({ where: { keyword } });
                if (!exKeyword) {
                    result.push(keyword);
                    await Keyword.create({ keyword });
                } else {
                    console.log(`${keyword} 키워드가 이미 존재합니다.`)
                }
            }
            res.status(200).json({ message: 'Keywords saved successfully', data: result });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };

    getKeywords = async (req, res, next) => {
        try {
            const keywords = await Keyword.findAll({});
            // console.log("keyword------------",keywords)

            res.status(200).json({ message: 'Get Keywords successfully', keywords });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
      
    deleteKeyword = async (req, res, next) => {
        try {
            const { keyword } = req.body;
            await Keyword.destroy({ where: { keyword } });

            res.status(200).json({ message: `${keyword} delete Keyword successfully`});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    editKeywords = async (req, res, next) => {
        try {
            const { keywordId, keyword } = req.body;
            await Keyword.update({ keyword }, { where: { keywordId } });

            res.status(200).json({ message: `${keyword} edit Keyword successfully`});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }


};

module.exports = SaveKeywordController;