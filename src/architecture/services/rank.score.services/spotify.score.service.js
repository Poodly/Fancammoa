require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyAccessTokenService = require('../spotify.access.token.service');
const SpotifyScoreRepository = require('../../repositories/rank.score.repositories/spotify.score.repository');

const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class SpotifyScoreService {
    spotifyAccessTokenService = new SpotifyAccessTokenService();
    spotifyScoreRepository = new SpotifyScoreRepository();
    
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    saveSpotifyScore = async () => {
        try {

            // 아이돌 이름을 배열로 받는 서비스 코드
            const allIdolDatas = await this.spotifyScoreRepository.getIdolDatas();
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            console.log(idolNamesArr)
            

            let spotifyArr = []
            for (let i = 0; i < idolNamesArr.length; i++) {
                try {
                    const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                        process.env.SPOTIFY_CLIENT_ID, 
                        process.env.SPOTIFY_CLIENT_SECRET
                        );                                                                                // API에 액세스하기 위해 인증 정보 설정

                    this.spotifyWebApi.setAccessToken(access_token);                                      // API에 액세스하기 위한 인증 정보 설정
                
                    const idolId   = idolNamesArr[i].idolId
                    const idolName = idolNamesArr[i].idolName

                    const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });        // 특정 아티스트 데이터 검색
                    const followers = result.body.artists.items[0].followers.total;
                    // const name      = result.body.artists.items[0].name;

                    spotifyArr.push({ idolName, followers })    

                    const spotifyScore = followers
                    await this.spotifyScoreRepository.updateSpotifyScore(spotifyScore, idolId); 
                }
                catch (error) {
                    console.log(`spotify 검색결과가 없습니다.`);
                    console.error(error);
                }
            }
            return spotifyArr

        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    IndividualUpdateSpotify = async (idolId) => {
        try {
            // 아이돌 이름 받는 서비스 코드
            const idolData = await this.spotifyScoreRepository.getIdolData(idolId);
            let idolName = idolData.dataValues.idolName;
            
            try {
                const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                    process.env.SPOTIFY_CLIENT_ID, 
                    process.env.SPOTIFY_CLIENT_SECRET
                    );                                                                                // API에 액세스하기 위해 인증 정보 설정

                this.spotifyWebApi.setAccessToken(access_token);                                      // API에 액세스하기 위한 인증 정보 설정

                const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });        // 특정 아티스트 데이터 검색
                
                const followers = result.body.artists.items[0].followers.total;
                const name      = result.body.artists.items[0].name;

                const spotifyScore = followers
                await this.spotifyScoreRepository.updateSpotifyScore(spotifyScore, idolId); 
                return spotifyScore

            } catch (error) {
                console.log(`spotify 검색결과가 없습니다.`);
                console.error(error);
            }
        }catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

module.exports = SpotifyScoreService;