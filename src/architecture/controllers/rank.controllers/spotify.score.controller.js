require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyAccessTokenService = require('../../services/spotify.access.token.service');
const axios = require('axios');

const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class SpotifyScoreController {

    spotifyAccessTokenService = new SpotifyAccessTokenService();
    
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFYCLIENTID,
        clientSecret: process.env.SPOTIFYCLIENTSECRET,
    });

    saveSpotifyScore = async (req, res, next) => {
        try {

            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 2
            });
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            console.log(idolNamesArr)
            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------

            let spotifyArr = []
            for (let i = 0; i < idolNamesArr.length; i++) {
                try {
                    const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                        process.env.SPOTIFYCLIENTID, 
                        process.env.SPOTIFYCLIENTSECRET
                        );                                                                                // API에 액세스하기 위해 인증 정보 설정

                    this.spotifyWebApi.setAccessToken(access_token);                                      // API에 액세스하기 위한 인증 정보 설정
                
                    const idolId   = idolNamesArr[i].idolId
                    const idolName = idolNamesArr[i].idolName

                    const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });        // 특정 아티스트 데이터 검색
                    
                    const followers = result.body.artists.items[0].followers.total;
                    const name      = result.body.artists.items[0].name;

                    // console.log("idolNames------------",idolId, idolName );
                    // console.log("spotifyScore------------",name, followers );
                    spotifyArr.push({ idolName, followers })    

                    const saveSpotifyScore = followers

                    await IdolRankScore.update({ spotifyScore: saveSpotifyScore }, { where: { idolId } });
                }
                catch (error) {
                    console.log(`spotify 검색결과가 없습니다.`);
                    console.error(error);
                }
            }
            
            // const artistSpotifyScore = {
            //     idolName,
            //     followers
            // }
   
            res.status(200).json({ data: spotifyArr })

        } catch (error) {
            console.error('SpotifyApi Something went wrong!', error);
            next();
        }
    }
}

module.exports = SpotifyScoreController;


// const names = allIdolDatas.map(allIdolData => allIdolData.idolName);
// console.log("names------------",names );
// res.status(200).json({ data: allIdolDatas })




// async getToken() {
//     const authOptions = {
//         method: 'post',
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//             'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFYCLIENTID + ':' + process.env.SPOTIFYCLIENTSECRET).toString('base64'),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         params: {
//             grant_type: 'client_credentials'
//         },
//         json: true
//     };
//     const response = await axios(authOptions);
//     return response.data.access_token;
// }
