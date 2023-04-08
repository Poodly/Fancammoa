const KpopNewsGetRepository = require('../../repositories/kpop.news.repositories/kpop.news.get.repository')

class KpopNewsGetService {
    kpopNewsGetRepository = new KpopNewsGetRepository();

    getKpopNews = async (limit, cursor) => {
        try {
            let kpopNews;
            if (!cursor) {
                kpopNews = await this.kpopNewsGetRepository.getFirstKpopNews(limit)
            } else {
                kpopNews = await this.kpopNewsGetRepository.getNextBeforeKpopNews(limit, cursor)
            }
            return kpopNews
    
        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    maxCount = async (limit) => {
        try {
            let maxCount = Math.round((await this.kpopNewsGetRepository.maxCount() - 3) / limit);
            return maxCount

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };
    
    getTop3KpopNews = async () => {
        try {
            const top3KpopNews = await this.kpopNewsGetRepository.getTop3KpopNews()
            return top3KpopNews

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    getAllnews = async () => {
        try {
            const kpopNews = await this.kpopNewsGetRepository.getAllnews()
            return kpopNews

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };
};

module.exports = KpopNewsGetService;