const { IdolData, IdolRankScore, IdolImage } = require('../../../models');


class GetRankInfoController {

    getRankInfoItems = async (req, res, next) => {
        try {
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['youtubeScore', 'spotifyScore', 'instaScore', 'googleScore', 'overallScore'],
                },{             
                    model: IdolImage,
                    attributes: ['img'],
                }],                                
                // limit: 5
            });

            let RankInfoItems = []
            for (const idolData of allIdolDatas) {
                const items = idolData.dataValues;
                
                let idolId       = items.idolId;
                let idolName     = items.idolName;
                let idolImage    = items.IdolImages[0];
                let youtubeScore = parseInt(items.IdolRankScore.dataValues.youtubeScore);
                let spotifyScore = parseInt(items.IdolRankScore.dataValues.spotifyScore);
                let instaScore = parseInt(items.IdolRankScore.dataValues.instaScore);
                let googleScore = parseInt(items.IdolRankScore.dataValues.googleScore);
                let overallScore = parseInt(items.IdolRankScore.dataValues.overallScore);

                let IdolRankInfoItems = {
                    idolId,
                    idolName,
                    idolImage,
                    youtubeScore,
                    spotifyScore,
                    instaScore,
                    googleScore,
                    overallScore
                }
                RankInfoItems.push(IdolRankInfoItems)
                // console.log("RankInfoItems items-----------",items)
            }
    
            console.log("RankInfoItems-----------",RankInfoItems)

            RankInfoItems.sort((a, b) => b.overallScore - a.overallScore); // overallScore 기준 객체 정렬
            res.status(200).json({ RankInfoItems });

        }catch (error) {
            console.error(error);
            next(error);
        };

    };
};

module.exports = GetRankInfoController;