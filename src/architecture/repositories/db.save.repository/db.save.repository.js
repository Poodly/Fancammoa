const { IdolData } = require('../../../models');

class DbSaveRepository {

    idolNameSave = async (idolName) => {
        try {
            await IdolData.create({ idolName });
        }catch (error) {
            throw new Error(error.message);
        }   
    };
}
  
module.exports = DbSaveRepository;

 