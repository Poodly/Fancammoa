// const { KpopNews } = require('../../../models')

// class KpopNewsGetController {

//     getKpopNews = async (req, res, next) => {
//         try {
//             const allKpopNews = await KpopNews.findAll({})
//             res.status(200).json({ allKpopNews })
    
//         } catch (error) {
//             console.error(error);
//             res.status(400).json({ message: error })
            
//         }
//     }
// }

// module.exports = KpopNewsGetController;

// const { KpopNews } = require('../../../models');

// class KpopNewsGetController {
//     getKpopNews = async (req, res, next) => {
//         try {
//             // Parse the cursor and limit parameters from the query string
//             const cursor = req.query.cursor ? parseInt(req.query.cursor) : Date.now();
//             const limit = parseInt(req.query.limit) || 10;

//             // Retrieve the Kpop news for the current page
//             const allKpopNews = await KpopNews.findAll({
//                 where: {
//                 createdAt: {
//                     [req.query.cursor ? '$lt' : '$lte']: new Date(cursor),
//                 },
//                 },
//                 limit,
//                 order: [['createdAt', 'DESC']],
//             });

//             // Check if there are more pages
//             const hasMore = allKpopNews.length === limit;

//             // Calculate the next cursor
//             const nextCursor = hasMore ? allKpopNews[allKpopNews.length - 1].createdAt.getTime() : null;

//             // Send a JSON response with the Kpop news and pagination information
//             res.status(200).json({
//                 kpopNews: allKpopNews,
//                 hasMore,
//                 nextCursor,
//             });

//         } catch (error) {
//             console.error(error);
//             res.status(400).json({ message: error });
//         }
//     };
// };

// module.exports = KpopNewsGetController;

const { KpopNews } = require('../../../models')
const { Op } = require("sequelize");

class KpopNewsGetController {
    getKpopNews = async (req, res, next) => {
        try {
            const cursor = parseInt(req.params.cursor);
            const limit = parseInt(req.params.limit);
    
            console.log('cursor-------------', cursor);
            console.log('limit--------------', limit);
    
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
                        newsType: 'other'
                    },
                    limit,
                    order: [['newsId', 'ASC']],
                });
            }
            res.status(200).json({ kpopNews });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        }
    };
    
    getTop3KpopNews = async (req, res, next) => {
        try {
            const top3KpopNews = await KpopNews.findAll({ 
                where: { newsType: 'Top3' },
                // limit: 3,
                order: [['newsId', 'ASC']], // ASC:올림차순 DESC:내림차순
            });
            res.status(200).json({ top3KpopNews });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error })
        }
    }
}

module.exports = KpopNewsGetController;
