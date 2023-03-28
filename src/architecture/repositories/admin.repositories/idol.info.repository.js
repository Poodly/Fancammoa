const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

class IdolInfoRepository {

    craeteIdol = async (idolName) => {
        try {
            const idolNameSvae = await IdolData.create({ idolName });
            return idolNameSvae

        }catch(error) {
            console.error(error);
            next();
        }
    } 

    craeteIdolRankScore = async (idolId) => {
        try {
            await IdolRankScore.create( { idolId } );
            return

        }catch(error) {
            console.error(error);
            next();
        }
    } 

    exIdolName = async (idolName) => {
        try {
            const exIdolName = await IdolData.findOne({ where: { idolName } });
            return exIdolName

        }catch(error) {
            console.error(error);
            next();
        }
    }

    updateIdolScore = async (idolId, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore) => {
        try {
            await IdolRankScore.update({ 
                youtubeScore, 
                spotifyScore, 
                instaScore, 
                googleScore, 
                overallScore 
            }, { where: { idolId } }); // 점수들을 업데이트
            await IdolData.update({ idolName }, { where: { idolId } }); // 이름 업데이트            
            return

        }catch (error) {
            console.error(error);
            next();
        };
    }

    deleteIdol = async (idolId) => {
        try {
            await IdolRankScore.destroy({ where: { idolId } })
            await IdolImage.destroy({ where: { idolId } })
            await IdolData.destroy({ where: { idolId } })
            return

        }catch (error) {
            console.error(error);
            next();
        };
    }
};

module.exports = IdolInfoRepository;