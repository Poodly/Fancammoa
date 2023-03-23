const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

const ImageService = require('../../services/admin.services/image.service');
const IdolInfoService = require('../../services/admin.services/idol.info.service');

class IdolInfoController {

    imageService = new ImageService();
    idolInfoService = new IdolInfoService();

    craeteIdol = async (req, res, next) => {
        try {
            const { idolName } = req.body;
            const saveName = await this.idolInfoService.craeteIdol(idolName);
            res.status(200).json({ message: `idolName:${saveName} 생성 성공` });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        };
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
            res.status(400).json({ message: error });
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
            res.status(400).json({ message: error });
        };
    }

};

module.exports = IdolInfoController;