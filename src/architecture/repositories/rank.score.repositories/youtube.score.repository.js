const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class YoutubeScoreRepository {

    getIdolDatas = async () => {
        try {
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 2
            });
            return allIdolDatas;

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    getIdolData = async (idolId) => {
        try {
            const idolData = await IdolData.findOne({ where: { idolId } });
            return idolData;

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    updateYoutubeScore = async (youtubeScore, idolId) => {
        try {
            await IdolRankScore.update({ youtubeScore }, { where: { idolId } }); // 비디오id를 가지로 얻은 점수를 db에 저장
            return

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
};

module.exports = YoutubeScoreRepository;