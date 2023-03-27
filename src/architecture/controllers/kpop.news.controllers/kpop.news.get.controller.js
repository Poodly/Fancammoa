const { KpopNews } = require('../../../models')
const { Op } = require("sequelize");

class KpopNewsGetController {

    getKpopNews = async (req, res, next) => {
        try {
            let limit    = parseInt(req.query.limit)
            let cursor   = parseInt(req.query.cursor)
            let maxCount = Math.round((await KpopNews.count() - 3) / limit);

            console.log('cursor-------------', cursor);
            console.log('maxCount-------------', maxCount);

            let kpopNews;
            if (!cursor) {
                kpopNews = await KpopNews.findAll({
                    where: { newsType: 'Ohter' },
                    limit,
                    order: [['newsId', 'ASC']],
                });
            } else {
                kpopNews = await KpopNews.findAll({
                    where: { 
                        newsId: { [Op.gt]: cursor },
                        newsType: 'Ohter'
                    },
                    limit,
                    order: [['newsId', 'ASC']],
                });             
            }
            res.status(200).json({ kpopNews, maxCount });
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        }
    };
    
    getTop3KpopNews = async (req, res, next) => {
        try {
            const top3KpopNews = await KpopNews.findAll({ 
                where: { newsType: 'Top3' },
                order: [['newsId', 'ASC']], // ASC:올림차순 DESC:내림차순
            });
            res.status(200).json({ top3KpopNews });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
        }
    }

    getAllnews = async (req, res, next) => {
        try {
            const kpopNews = await KpopNews.findAll({});
            res.status(200).json({ kpopNews });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
        }
    }

    deleteNews = async (req, res, next) => {
        try {
            const { newsId } = req.body;
            console.log("newsId----------",newsId);
            await KpopNews.destroy({ where: { newsId } });
            res.status(200).json({ message: '뉴스 삭제 성공' });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
        }
    }
};

module.exports = KpopNewsGetController;