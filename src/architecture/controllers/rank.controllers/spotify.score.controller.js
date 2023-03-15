require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

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
    
    GetSpotifyfollowerCount = async (req, res, next) => {
        try {
            // API에 액세스하기 위해 인증 정보 설정
            const access_token = await this.getToken();
            console.log('The access token is ' + access_token);

            // API에 액세스하기 위한 인증 정보 설정
            this.spotifyWebApi.setAccessToken(access_token);

            // k-Pop 아티스트 데이터 검색
            const result = await this.spotifyWebApi.searchArtists('k-pop', { limit: 2 });
            console.log('Search artists by "k-pop"');
            console.log(result.body.artists.items);

        } catch (error) {
            console.error('SpotifyApi Something went wrong!', error);
        }
    }
}
module.exports = SpotifyScoreController;