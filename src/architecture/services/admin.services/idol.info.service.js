const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

const ImageService = require('./image.service');

const IdolInfoRepository = require('../../repositories/admin.repositories/idol.info.repository');

class IdolInfoService {

    imageService = new ImageService();
    idolInfoRepository = new IdolInfoRepository();

    craeteIdol = async (idolName) => {
        try {
            if (/^[a-zA-Z0-9-\s!@#$%^&*()_+=[\]{}|\\;:'",.<>/?`~]*$/.test(idolName)) { // 이름이 영문자, 숫자, 특수문자, 하이픈, 공백으로만 이루어진 경우에만 추가// 한글은 제외                  
                let saveName = idolName.replace(/[^a-zA-Z]/g, "");                     // 특수문자 없애기
                const exIdolName = await this.idolInfoRepository.exIdolName(saveName)

                if (!exIdolName) {
                    const idolNameSvae = await this.idolInfoRepository.craeteIdol(saveName)
                    const idolId = idolNameSvae.idolId
                    await this.idolInfoRepository.craeteIdolRankScore(idolId)
                    await this.imageService.querySaveSpotifyImg(idolId, idolName); 
                       
                } else {
                    throw new Error(`${saveName}는 db에 겹치는 이름이 있습니다.`);
                }
            } else {
                throw new Error(`${idolName}는 한글이므로 추가하지 않습니다.`);
            }
            return saveName;

        }catch (error) {
            console.error(error);
            next(error);
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

module.exports = IdolInfoService;