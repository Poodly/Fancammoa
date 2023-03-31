const { KpopNews } = require('../../../models')

class KpopNewsEditRepository {

    deleteNews = async (newsId) => {
        try {
            await KpopNews.destroy({ where: { newsId } });
            return 

        }catch(error) {
            console.error(error);
            next();
        };
    };
};

module.exports = KpopNewsEditRepository;