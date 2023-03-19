const { IdolData, IdolRankScore, IdolImage } = require('../../../models');

class RankInfoController {

    getRankInfoItems = async (req, res, next) => {
        try {
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                include: [{             
                    model: IdolRankScore,
                    attributes: ['youtubeScore', 'spotifyScore', 'instaScore', 'googleScore', 'overallScore'],
                },{             
                    model: IdolImage,
                    attributes: ['img'],
                }],                                
                // limit: 5
            });

            let RankInfoItems = []
            for (const idolData of allIdolDatas) {
                const items = idolData.dataValues;
                
                let idolId       = items.idolId;
                let idolName     = items.idolName;
                let idolImage    = items.IdolImages[0];
                let youtubeScore = parseInt(items.IdolRankScore.dataValues.youtubeScore);
                let spotifyScore = parseInt(items.IdolRankScore.dataValues.spotifyScore);
                let instaScore = parseInt(items.IdolRankScore.dataValues.instaScore);
                let googleScore = parseInt(items.IdolRankScore.dataValues.googleScore);
                let overallScore = parseInt(items.IdolRankScore.dataValues.overallScore);

                let IdolRankInfoItems = {
                    idolId,
                    idolName,
                    idolImage,
                    youtubeScore,
                    spotifyScore,
                    instaScore,
                    googleScore,
                    overallScore
                }
                RankInfoItems.push(IdolRankInfoItems)
                // console.log("RankInfoItems items-----------",items)
            }
    
            // console.log("RankInfoItems-----------",RankInfoItems)

            RankInfoItems.sort((a, b) => b.overallScore - a.overallScore); // overallScore 기준 객체 정렬
            res.status(200).json({ RankInfoItems });

        }catch (error) {
            console.error(error);
            next(error);
        };

    };


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

    craeteIdol = async (req, res, next) => {
        try {
            const { idolName } = req.body;

            if (/^[a-zA-Z0-9-\s!@#$%^&*()_+=[\]{}|\\;:'",.<>/?`~]*$/.test(idolName)) { // 이름이 영문자, 숫자, 특수문자, 하이픈, 공백으로만 이루어진 경우에만 추가// 한글은 제외                  
                let saveName = idolName.replace(/[^a-zA-Z]/g, "");                     // 특수문자 없애기
                const exIdolName = await IdolData.findOne({ where: { idolName } });

                if (!exIdolName) {
                    const idolNameSvae = await IdolData.create({ idolName });
                    await IdolRankScore.create( { idolId: idolNameSvae.idolId } );    
                    await IdolImage.create( { idolId: idolNameSvae.idolId } );    
                } else {
                    console.log(`${saveName}는 db에 겹치는 이름이 있습니다.`)
                }
            } else {
                console.log(`${idolName}는 한글이므로 추가하지 않습니다.`) // 한글 이름인 경우 로그 출력
            }

            res.status(200).json({ message: `idolName:${idolName} 생성 성공` });

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

module.exports = RankInfoController;