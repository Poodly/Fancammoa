const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

class IdolInfoRepository {

    craeteIdol = async (idolName) => {
        try {
            const idolNameSvae = await IdolData.create({ idolName });
            return idolNameSvae

        }catch (error) {
            console.error(error);
            throw new Error('아이돌 생성 실패');
        };
    } 

    craeteIdolRankScore = async (idolId) => {
        try {
            await IdolRankScore.create( { idolId } );
            return

        }catch (error) {
            console.error(error);
            throw new Error('아이돌 순위 점수 생성 실패');
        };
    };

    exIdolName = async (idolName) => {
        try {
            const exIdolName = await IdolData.findOne({ where: { idolName } });
            return exIdolName

        }catch (error) {
            console.error(error);
            throw new Error('아이돌 이름 조회 실패');
        };
    };

    updateIdolScore = async (idolName, youtubeScore, spotifyScore, instaScore, googleScore, overallScore, idolId) => {
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
            throw new Error('아이돌 점수 업데이트 실패');
        };
    };

    deleteIdol = async (idolId) => {
        try {
            await IdolRankScore.destroy({ where: { idolId } })
            await IdolImage.destroy({ where: { idolId } })
            await IdolData.destroy({ where: { idolId } })
            return

        }catch (error) {
            console.error(error);
            throw new Error('아이돌 삭제 실패');
        };
    };
};

module.exports = IdolInfoRepository;