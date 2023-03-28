const KpopNewsEditRepository = require('../../repositories/kpop.news.repositories/kpop.news.edit.repository')

class KpopNewsEditService {
    kpopNewsEditRepository = new KpopNewsEditRepository();

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