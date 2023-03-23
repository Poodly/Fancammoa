const OverallScoreRepository = require('../../repositories/rank.score.repositories/overall.score.repository');

class OverallScoreService {
    overallScoreRepository = new OverallScoreRepository();

    saveOverallScore = async (req, res, next) => {
        try {
            const allIdolScores = await this.overallScoreRepository.getAllIdolScores();

            let overallScore = 0;
            for (const IdolScores of allIdolScores) {
                const items = IdolScores.dataValues;
                
                let idolId       = items.idolId;
                let youtubeScore = parseInt(items.IdolRankScore.dataValues.youtubeScore);
                let spotifyScore = parseInt(items.IdolRankScore.dataValues.spotifyScore);

                overallScore = youtubeScore + spotifyScore;
                await this.overallScoreRepository.updateOverallScore(overallScore, idolId); // 합산 점수를 db에 저장
            }
            return

        }catch (error) {
            console.error(error);
            next(error);
        };
    };

    getOverallScore = async () => {
        try {
            const OverallScore = await this.overallScoreRepository.getOverallScore();

            let ScoreDataArr = []
            for (const idolData of OverallScore) {
                const items = idolData.dataValues;
                
                let idolId       = items.idolId;
                let idolName     = items.idolName;
                let overallScore = parseInt(items.IdolRankScore.dataValues.overallScore);
    
                let IdolRankScoreData = {
                    idolId,
                    idolName,
                    overallScore
                }
                ScoreDataArr.push(IdolRankScoreData)
            }
            return ScoreDataArr

        }catch (error) {
            console.error(error);
            next(error);
        };
    }
};

module.exports = OverallScoreService;