const KpopNewsService = require('../../services/kpop.news.services/kpop.news.save.service');

class KpopNewsController {
    kpopNewsService = new KpopNewsService();

    saveKpopNews = async (req, res, next) => {
        try {
            await this.kpopNewsService.saveKpopNews();
            res.status(200).json({ message: "News saved success" })

        }catch (error){
            console.error(error);
            next(error); 
        };
    }
}

module.exports = KpopNewsController;