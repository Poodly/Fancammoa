const { IdolData } = require('../../../models');

class DbSaveRepository {

    idolNameSave = async (idolName) => {
        try {
            await IdolData.create({ idolName });
        }catch (error) {
            throw new Error(error.message);
        }   
    };

    exIdolName = async(idolName) => {
        try {
            const exIdolName = await IdolData.findOne({ where: { idolName } });
            return exIdolName;
        }catch (error) {
            throw new Error(error.message);
        }
    }
}
  
module.exports = DbSaveRepository;

 