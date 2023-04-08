const KpopNewsGetService = require('../../services/kpop.news.services/kpop.news.get.service')

class KpopNewsGetController {
    kpopNewsGetService = new KpopNewsGetService();

    getKpopNews = async (req, res, next) => {
        try {
            let limit    = parseInt(req.query.limit)
            let cursor   = parseInt(req.query.cursor)
            let maxCount = await this.kpopNewsGetService.maxCount(limit);

            let kpopNews = await this.kpopNewsGetService.getKpopNews(limit, cursor)
            res.status(200).json({ kpopNews, maxCount });
    
        }catch (error){
            console.error(error);
            next(error); 
        };
    };
    
    getTop3KpopNews = async (req, res, next) => {
        try {
            const top3KpopNews = await this.kpopNewsGetService.getTop3KpopNews()
            res.status(200).json({ top3KpopNews });

        }catch (error){
            console.error(error);
            next(error); 
        };
    };

    getAllnews = async (req, res, next) => {
        try {
            const kpopNews = await this.kpopNewsGetService.getAllnews()
            res.status(200).json({ kpopNews });

        }catch (error){
            console.error(error);
            next(error); 
        };
    };
};

module.exports = KpopNewsGetController;