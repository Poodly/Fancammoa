const { KpopNews } = require('../../../models')

require("dotenv").config();

class KpopNewsRepository {

    deleteAllNews = async () => {
        try {
            await KpopNews.destroy({ where: {} });
            return

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    createNews = async (newsLink, newsImg, newsTitle, press, newsDate, newsType) => {
        try {
            await KpopNews.create({ newsLink, newsImg, newsTitle, press, newsDate, newsType });
            return

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    exTop3News = async (newsType) => {
        try {
            const exTop3 = await KpopNews.findAll({ where: { newsType } });
            return exTop3

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };
    
    exKpopNews = async (newsImg, newsTitle, newsDate) => {
        try {
            const exKpopNews = await KpopNews.findOne({ where: { newsImg, newsTitle, newsDate } });
            return exKpopNews

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };  

    KpopNewsLength = async () => {
        try {
            const KpopNewsLength = await KpopNews.count() - 3;
            return KpopNewsLength

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };  
}

module.exports = KpopNewsRepository;