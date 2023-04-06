const KpopNewsEditRepository = require('../../repositories/kpop.news.repositories/kpop.news.edit.repository')

class KpopNewsEditService {
    kpopNewsEditRepository = new KpopNewsEditRepository();

    editNewsInfo = async (newsId, newsLink, newsImg, newsDate) => {
        try {
            await this.kpopNewsEditRepository.editNewsInfo(newsId, newsLink, newsImg, newsDate)
            return

        }catch(error) {
            console.error(error);
            next();
        };
    };

    deleteNews = async (newsId) => {
        try {
            await this.kpopNewsEditRepository.deleteNews(newsId)
            return

        }catch(error) {
            console.error(error);
            next();
        };
    };
};

module.exports = KpopNewsEditService;