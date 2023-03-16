require("dotenv").config();
const axios = require('axios');

const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class YoutubeScoreController {
    
    saveYoutubeScore = async (req, res, next) => {
        const startDateTime = new Date('2020-01-01T00:00:00Z').toISOString(); // set the start date and time in ISO format
        const currentDateTime = new Date().toISOString(); // set the current date and time in ISO format

        const APIKEY    = process.env.YOUTUBE_APIKEY6;
        const SEARCHURL = process.env.SEARCHURL;
        const VIDEOURL  = process.env.VIDEOURL;

        async function getVideoId(query) {
                const params = {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    key: APIKEY,
                    maxResults: 5,
                    order: 'viewCount',
                    publishedAfter: startDateTime,   // 시작 기간
                    publishedBefore: currentDateTime // 현재
                };
                const response = await axios.get(SEARCHURL, { params });
                const items = response.data.items;
                const videoId = items.map(item => item.id.videoId);
                return videoId;
                }

        async function getVideoScore(videoId) {
            const params = {
                part: 'snippet,statistics',
                id: videoId,
                key: APIKEY
            };
            const response = await axios.get(VIDEOURL, { params });
            const item = response.data.items[0];
            
            const viewCount    = parseInt(item.statistics.viewCount);
            const likeCount    = parseInt(item.statistics.likeCount);
            const commentCount = parseInt(item.statistics.commentCount);

            const data = Math.round((viewCount + likeCount + commentCount)/10000);
            return data;
        }

        try {
            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 2
            });
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
    
            // 특정 가수의 상위 3~5~10 개의 영상을 가지고 조회수, 좋아요, 댓글수 가지고 점수 산정

            let result = []

            for (let i = 0; i < idolNamesArr.length; i++) {
                let query = idolNamesArr[i].idolName
                let idolId = idolNamesArr[i].idolId

                const videoIdArr = await getVideoId(query);
                // console.log("videoIdArr--------------------",videoIdArr);

                let youtubeVideoScore = 0
                for(let i = 0; i < videoIdArr.length; i++) {
                    const data = await getVideoScore(videoIdArr[i]);
                    youtubeVideoScore += data;
                    
                }
                
                const saveYoutubeVideoScore = youtubeVideoScore;

                await IdolRankScore.update({ youtubeScore: saveYoutubeVideoScore }, { where: { idolId } }); // 비디오id를 가지로 얻은 점수를 db에 저장
                let Score = {
                    idolId,
                    query,
                    youtubeVideoScore
                    }
                
                console.log(Score)
                result.push(Score);

                console.log(`${query}'s Success saving youtube score !!`);

            }

            res.status(200).json({ message: "Success saving youtube score !!" });
            // res.status(200).json({ data: result });

        } catch (error) {
            console.error(error);
            next(error);
        }
    };
};

module.exports = YoutubeScoreController;