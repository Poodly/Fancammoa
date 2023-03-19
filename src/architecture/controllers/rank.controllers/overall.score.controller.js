const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class OverallScoreController {

    saveOverallScore = async (req, res, next) => {
        try {
            
            // include는 관계설정된 모델끼리 사용할수있다.
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['youtubeScore', 'spotifyScore'],
                }],                                
                // limit: 2
            });

            let overallScore = 0;
            for (const idolData of allIdolDatas) {
                const items = idolData.dataValues;
                
                let idolId       = items.idolId;
                let youtubeScore = parseInt(items.IdolRankScore.dataValues.youtubeScore);
                let spotifyScore = parseInt(items.IdolRankScore.dataValues.spotifyScore);

                overallScore = youtubeScore + spotifyScore;

                // console.log("IdolRankScoreArr----------", items.idolId);
                // console.log("IdolRankScoreArr----------", items.IdolRankScore.dataValues);
                // console.log("overallScore----------", overallScore);

                await IdolRankScore.update({ overallScore }, { where: { idolId } }); // 합산 점수를 db에 저장
            }
    
            res.status(200).json({ message: "Success saving overall score !!" })

        }catch (error) {
            console.error(error);
            next(error);
        };
    };

    getOverallScore = async (req, res, next) => {

        const allIdolDatas = await IdolData.findAll({
            attributes: [ 'idolId', 'idolName' ],
            include: [{             
                model: IdolRankScore,
                attributes: ['overallScore'],
            }],                                
            // limit: 2
        });

        let ScoreDataArr = []
        for (const idolData of allIdolDatas) {
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
        
        // console.log("ScoreDataArr----------", ScoreDataArr);
        res.status(200).json({ data: ScoreDataArr })
    }
};

module.exports = OverallScoreController;