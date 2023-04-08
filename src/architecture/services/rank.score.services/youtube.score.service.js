require("dotenv").config();
const env = process.env;
const axios = require('axios');
const YoutubeScoreRepository = require('../../repositories/rank.score.repositories/youtube.score.repository');

class YoutubeScoreService {
    youtubeScoreRepository = new YoutubeScoreRepository();

    getVideoId = async (query, APIKEY, startDateTime, currentDateTime, SEARCHURL) => {
        try {
            const params = {
                part: 'snippet',
                q: query,
                type: 'video',
                key: APIKEY,
                maxResults: env.SCORE_MAX_RESULTS,
                order: 'viewCount',
                publishedAfter: startDateTime,   // 시작 기간
                publishedBefore: currentDateTime // 현재
            };
            const response = await axios.get(SEARCHURL, { params });
            const items = response.data.items;
            const videoId = items.map(item => item.id.videoId);
            return videoId;
            
        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    getVideoScore = async (videoId, APIKEY, VIDEOURL) => {
        try {
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
    
            // const data = Math.round((viewCount + likeCount + commentCount)/10000);
            const data = viewCount + likeCount + commentCount;
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------
    saveYoutubeScore = async () => {
        const startDateTime = new Date(env.YOUTUBE_START_DATETIME).toISOString(); // set the start date and time in ISO format
        const currentDateTime = new Date().toISOString(); // set the current date and time in ISO format

        const APIKEY    = process.env.YOUTUBE_APIKEY;
        const SEARCHURL = process.env.SEARCHURL;
        const VIDEOURL  = process.env.VIDEOURL;

        try {
            // 아이돌 이름을 배열로 받는 서비스 코드
            const allIdolDatas = await this.youtubeScoreRepository.getIdolDatas();
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            
            // 특정 가수의 상위 3~5~10 개의 영상을 가지고 조회수, 좋아요, 댓글수 가지고 점수 산정

            for (let i = 0; i < idolNamesArr.length; i++) {
                let query = idolNamesArr[i].idolName
                let idolId = idolNamesArr[i].idolId

                const videoIdArr = await this.getVideoId(query, APIKEY, startDateTime, currentDateTime, SEARCHURL);
                // console.log("videoIdArr--------------------",videoIdArr);

                let youtubeScore = 0
                for(let i = 0; i < videoIdArr.length; i++) {
                    const data = await this.getVideoScore(videoIdArr[i], APIKEY, VIDEOURL);
                    youtubeScore += data;
                    
                }
                await this.youtubeScoreRepository.updateYoutubeScore(youtubeScore, idolId); // 비디오id를 가지로 얻은 점수를 db에 저장
            }
            return

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    IndividualSaveYoutubeScore = async (idolId) => {
        const startDateTime = new Date(env.YOUTUBE_START_DATETIME).toISOString(); // set the start date and time in ISO format
        const currentDateTime = new Date().toISOString(); // set the current date and time in ISO format

        const APIKEY    = process.env.YOUTUBE_APIKEY;
        const SEARCHURL = process.env.SEARCHURL;
        const VIDEOURL  = process.env.VIDEOURL;

        try {
            // 아이돌 이름 받는 서비스 코드
            const idolDatas = await this.youtubeScoreRepository.getIdolData(idolId);
            let idolName = idolDatas.dataValues.idolName;

            const videoIdArr = await this.getVideoId(idolName, APIKEY, startDateTime, currentDateTime, SEARCHURL);

            let youtubeScore = 0
            for(let i = 0; i < videoIdArr.length; i++) {
                const data = await this.getVideoScore(videoIdArr[i], APIKEY, VIDEOURL);
                youtubeScore += data;
                
            }
            await this.youtubeScoreRepository.updateYoutubeScore(youtubeScore, idolId); // 비디오id를 가지로 얻은 점수를 db에 저장   
            return youtubeScore
            
        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    };
};

module.exports = YoutubeScoreService;