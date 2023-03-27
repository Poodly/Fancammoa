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

    



    updateIdolScore = async (req, res, next) => {
        try {
            const { idolId, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore } = req.body;
            await IdolRankScore.update({ 
                youtubeScore, 
                spotifyScore, 
                instaScore, 
                googleScore, 
                overallScore 
            }, { where: { idolId } }); // 점수들을 업데이트
            
            await IdolData.update({ idolName }, { where: { idolId } }); // 이름 업데이트            
            res.status(200).json({ message: `idolId:${idolId}, idolName: ${idolId}의 점수 데이터 수정 성공!!` });

        }catch (error) {
            console.error(error);
            next(error);
        };
    }


    deleteIdol = async (req, res, next) => {
        try {
            const { idolId } = req.body;
            console.log("idolId-----------", idolId);
            await IdolRankScore.destroy({ where: { idolId } })
            await IdolImage.destroy({ where: { idolId } })
            await IdolData.destroy({ where: { idolId } })
            res.status(200).json({ message: `idolId:${idolId} 삭제 성공` });

        }catch (error) {
            console.error(error);
            next(error);
        };
    }

};

module.exports = IdolInfoRepository;