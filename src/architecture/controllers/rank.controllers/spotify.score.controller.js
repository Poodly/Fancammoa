require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

const { IdolData } = require('../../../models')
const { IdolRankScore } = require('../../../models')

class SpotifyScoreController {
    
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFYCLIENTID,
        clientSecret: process.env.SPOTIFYCLIENTSECRET,
    });

    async getToken() {
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFYCLIENTID + ':' + process.env.SPOTIFYCLIENTSECRET).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        const response = await axios(authOptions);
        return response.data.access_token;
    }
    
    saveSpotifyScore = async (req, res, next) => {
        try {

            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 5
            });
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------

            for (let i = 0; i < idolNamesArr.length; i++) {
                try {
                    // API에 액세스하기 위해 인증 정보 설정
                    const access_token = await this.getToken();
                
                    // API에 액세스하기 위한 인증 정보 설정
                    this.spotifyWebApi.setAccessToken(access_token);
                
                    // 특정 아티스트 데이터 검색
                    const result = await this.spotifyWebApi.searchArtists(idolNamesArr[i].idolName, { limit: 1 });
                    const idolId = idolNamesArr[i].idolId
                    
                    const idolName   = result.body.artists.items[0].name;
                    const followers  = result.body.artists.items[0].followers.total;

                    // console.log("idolNames------------",idolNamesArr[i].idolId, idolNamesArr[i].idolName );
                    // console.log("idolName------------",idolName, followers );

                    await IdolRankScore.update({ spotifyScore: followers }, { where: { idolId } });
                } 
                catch (error) {
                    console.log(`${idolName}는 spotify 검색결과가 없습니다.`);
                }
            }
            
            // const artistSpotifyScore = {
            //     idolName,
            //     followers
            // }
   
            res.status(200).json({ message: "Success saving spotify score !!" })

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