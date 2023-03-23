const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class OverallScoreRepository {

    getAllIdolScores = async () => {
        try {
            // include는 관계설정된 모델끼리 사용할수있다.
            const allIdolScores = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['youtubeScore', 'spotifyScore'],
                }],                                
                // limit: 2
            });
            return allIdolScores;

        }catch(error) {
            console.error(error);
            next();
        }
    }

    updateOverallScore = async (overallScore, idolId) => {
        try {
            await IdolRankScore.update({ overallScore }, { where: { idolId } }); // 합산 점수를 db에 저장
            return

        }catch(error) {
            console.error(error);
            next();
        };
    };

    getOverallScore = async () => {
        try {
            const allIdolScores = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['overallScore'],
                }],                                
                // limit: 2
            });
            return allIdolScores

        }catch(error) {
            console.error(error);
            next();
        };
    };
};

module.exports = OverallScoreRepository;