const KpopNewsEditService = require('../../services/kpop.news.services/kpop.news.edit.service')

class KpopNewsEditController {
    kpopNewsEditService = new KpopNewsEditService();

    deleteNews = async (req, res, next) => {
        try {
            const { newsId } = req.body;
            console.log("newsId----------",newsId);
            await this.kpopNewsEditService.deleteNews(newsId)
            res.status(200).json({ message: '뉴스 삭제 성공' });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
        };
    };
};

module.exports = KpopNewsEditController;