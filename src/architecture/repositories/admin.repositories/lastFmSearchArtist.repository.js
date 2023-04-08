const { IdolData } = require('../../../models');
const { IdolRankScore } = require('../../../models');

class LastFmSearchArtistRepository {

    idolNameSave = async (idolName) => {
        try {
            const idolNameSvae = await IdolData.create({ idolName });
            await IdolRankScore.create( { idolId: idolNameSvae.idolId } );  // IdolData 생성과동시에 IdolRankScore에 idolId를 저장하게됨
        }catch (err) {
            console.error(err);
            throw err;
        }; 
    };

    exIdolName = async(idolName) => {
        try {
            const exIdolName = await IdolData.findOne({ where: { idolName } });
            return exIdolName;
        }catch (err) {
            console.error(err);
            throw err;
        };
    }
}
  
module.exports = LastFmSearchArtistRepository;

 