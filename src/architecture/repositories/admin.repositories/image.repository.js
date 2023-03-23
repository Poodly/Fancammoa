const { IdolData, IdolImage }   = require('../../../models')

class ImageRepository {

    createImg = async (img, idolId) => {
        try {
            await IdolImage.create({ img, idolId });
            return

        } catch(error) {
            console.error(error);
            next();
        }
    }

    getIdolDatas = async () => {
        try {
            // 아이돌 이름을 배열로 받는 서비스 코드
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 3
            });
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            return idolNamesArr;

        } catch(error) {
            console.error(error);
            next();
        };
    };

    replaceIdolImg = async (imgId, idolImage) => {
        try {
            await IdolImage.update({ img: idolImage }, { where: { id: imgId } }) // 이미지 교체
            return

        }catch (error) {
            console.log(error);
            next();
        };
    };
}

module.exports = ImageRepository;