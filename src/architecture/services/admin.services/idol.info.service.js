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
            next();
        };
    }
    
    updateIdolScore = async (idolId, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore) => {
        try {
            await this.idolInfoRepository.updateIdolScore(idolId, idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore ); // 점수들을 업데이트
            return

        }catch (error) {
            console.error(error);
            next();
        };
    }

    deleteIdol = async (idolId) => {
        try {
            await this.idolInfoRepository.deleteIdol(idolId)
            return

        }catch (error) {
            console.error(error);
            next();
        };
    }
};

module.exports = IdolInfoService;