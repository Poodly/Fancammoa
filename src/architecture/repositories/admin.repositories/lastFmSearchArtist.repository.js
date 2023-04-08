const { IdolData } = require('../../../models');
const { IdolRankScore } = require('../../../models');

class LastFmSearchArtistRepository {

    idolNameSave = async (idolName) => {
        try {
            const idolNameSvae = await IdolData.create({ idolName });
            await IdolRankScore.create( { idolId: idolNameSvae.idolId } );  // IdolData 생성과동시에 IdolRankScore에 idolId를 저장하게됨

        }catch (error) {
            console.error(error);
            throw new Error('Last Fm 아이돌 이름 생성 실패');
        }
    };

    exIdolName = async(idolName) => {
        try {
            const exIdolName = await IdolData.findOne({ where: { idolName } });
            return exIdolName;

        }catch (error) {
            console.error(error);
            throw new Error('아이돌 개별 이름 조회 실패');
        }
    }
}
  
module.exports = LastFmSearchArtistRepository;

 