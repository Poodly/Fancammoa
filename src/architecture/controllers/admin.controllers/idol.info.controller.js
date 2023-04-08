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

        }catch (err) {
            console.error(err);
            next(err)
        };
    }
    
    updateIdolScore = async (req, res, next) => {
        try {
            const { idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolId } = req.body;
            await this.idolInfoService.updateIdolScore(idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolId)          
            res.status(200).json({ message: `idolId:${idolId}, idolName: ${idolId}의 점수 데이터 수정 성공!!` });

        }catch (err) {
            console.error(err);
            next(err)
        };
    }

    deleteIdol = async (req, res, next) => {
        try {
            const { idolId } = req.body;
            await this.idolInfoService.deleteIdol(idolId)
            res.status(200).json({ message: `idolId:${idolId} 삭제 성공` });

        }catch (err) {
            console.error(err);
            next(err)
        };
    }
};

module.exports = IdolInfoController;