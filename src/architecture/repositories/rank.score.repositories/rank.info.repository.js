const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

class RankInfoRepository {

    getRankInfoAllItems = async (req, res, next) => {
        try {
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['youtubeScore', 'spotifyScore', 'instaScore', 'googleScore', 'overallScore'],
                },{             
                    model: IdolImage,
                    attributes: [ 'id', 'img' ],
                }],                                
                // limit: 5
            });
            return allIdolDatas

        }catch (error) {
            console.error(error);
            next(error);
        };
    };
};

module.exports = RankInfoRepository;