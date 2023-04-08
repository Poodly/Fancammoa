const RankInfoRepository = require('../../repositories/rank.score.repositories/rank.info.repository');

class RankInfoService {
    rankInfoRepository = new RankInfoRepository();

    getRankInfoAllItems = async (req, res, next) => {
        try {
            const allIdolDatas = await this.rankInfoRepository.getRankInfoAllItems();

            let RankInfoItems = []
            for (const idolData of allIdolDatas) {
                const items = idolData.dataValues;
                
                let idolId       = items.idolId;
                let idolName     = items.idolName;
                let idolImage    = items.IdolImages[0];
                let youtubeScore = parseInt(items.IdolRankScore.dataValues.youtubeScore);
                let spotifyScore = parseInt(items.IdolRankScore.dataValues.spotifyScore);
                let instaScore   = parseInt(items.IdolRankScore.dataValues.instaScore);
                let googleScore  = parseInt(items.IdolRankScore.dataValues.googleScore);
                let overallScore = parseInt(items.IdolRankScore.dataValues.overallScore);

                let IdolRankInfoItems = {
                    idolId,
                    idolName,
                    idolImage,
                    youtubeScore,
                    spotifyScore,
                    instaScore,
                    googleScore,
                    overallScore,
                }
                RankInfoItems.push(IdolRankInfoItems)
            }

            RankInfoItems.sort((a, b) => b.overallScore - a.overallScore); // overallScore 기준 객체 정렬
            return RankInfoItems

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };
};

module.exports = RankInfoService;