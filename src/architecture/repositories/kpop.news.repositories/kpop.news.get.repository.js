const { KpopNews } = require('../../../models')
const { Op } = require("sequelize");

class KpopNewsGetRepository {

    getFirstKpopNews = async (limit, cursor) => {
        try {
            const kpopNews = await KpopNews.findAll({
                where: { newsType: 'Other' },
                limit,
                order: [['newsId', 'ASC']],
            });
            return kpopNews

        }catch(error) {
            console.error(error);
            next();
        };
    };

    getNextBeforeKpopNews = async (limit, cursor) => {
        try {
            const kpopNews = await KpopNews.findAll({
                where: { 
                    newsId: { [Op.gt]: cursor },
                    newsType: 'Other'
                },
                limit,
                order: [['newsId', 'ASC']],
            });
            return kpopNews

        }catch(error) {
            console.error(error);
            next();
        };
    };

    maxCount = async () => {
        try {
            let maxCount = await KpopNews.count();
            return maxCount

        }catch(error) {
            console.error(error);
            next();
        };
    };
    
    getTop3KpopNews = async () => {
        try {
            const top3KpopNews = await KpopNews.findAll({ 
                where: { newsType: 'Top3' },
                order: [['newsId', 'ASC']], // ASC:올림차순 DESC:내림차순
            });
            return top3KpopNews

        }catch(error) {
            console.error(error);
            next();
        };
    };

    getAllnews = async (req, res, next) => {
        try {
            const kpopNews = await KpopNews.findAll({});
            return kpopNews

        }catch(error) {
            console.error(error);
            next();
        };
    };
};

module.exports = KpopNewsGetRepository;