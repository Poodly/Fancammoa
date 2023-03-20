require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const searchQuery = "k-pop";

const { IdolData, IdolImage } = require('../../../models')
const DbSaveService = require('../../services/db.save.services/db.save.service');
const SpotifyAccessTokenService = require('../../services/spotify.access.token.service');

class DbSaveController {
    spotifyAccessTokenService = new SpotifyAccessTokenService();
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    dbSaveService = new DbSaveService();
    
    // Last Fm API
    searchArtistsDbSave = async (req, res, next) => {
        try {

            const response = await this.dbSaveService.searchArtistsDbSave();
            // res.status(200).json({ message: "Db save succeeded" });
            res.status(200).json({ message: response });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Last Fm API artist Search failed or db save failed", error: error });
        }
    };

    // Spotify API
    saveSpotifyImg = async (req, res, next) => {
        try {

            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
            const allIdolDatas = await IdolData.findAll({
                attributes: [ 'idolId', 'idolName' ],
                // limit: 3
            });
            const idolNamesArr = allIdolDatas.map(allIdolData => allIdolData.dataValues);
            console.log(idolNamesArr)
            // --------------------------------------------------------아이돌 이름을 배열로 받는 서비스 코드 --------------------------------------------------------
 
            for (let i = 0; i < idolNamesArr.length; i++) {
                try {
                    const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                        process.env.SPOTIFY_CLIENT_ID, 
                        process.env.SPOTIFY_CLIENT_SECRET
                        );                                                                           // API에 액세스하기 위해 인증 정보 설정

                    this.spotifyWebApi.setAccessToken(access_token);                                 // API에 액세스하기 위한 인증 정보 설정
                
                    const idolId   = idolNamesArr[i].idolId
                    const idolName = idolNamesArr[i].idolName

                    const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });   // 특정 아티스트 데이터 검색
                    
                    const followers = result.body.artists.items[0].followers.total;
                    const name      = result.body.artists.items[0].name;
                    const img    = result.body.artists.items[0].images[0].url;

                    const data = {
                        followers,
                        name,
                        img
                    }

                    // const exImg = await IdolImage.findOne({ where: { img } });
                    // if (!exImg) {
                    //     await IdolImage.create({ img, idolId });
                    //     console.log('Saving image')
                    // } else {
                    //     console.log('Image is exsit')
                    // }
                    
                    await IdolImage.create({ img, idolId });
                    // console.log("idolNames------------",idolId, idolName, img );
                }
                catch (error) {
                    console.log(`spotify 검색결과가 없습니다.`);
                    console.error(error);
                }
            }

            res.status(200).json({ message: "Success saving spotify img" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "spotify img save failed", error: error });
        };
    };

    replaceIdolImg = async (req, res, next) => {
        try {
            const { imgId, idolImage } = req.body
            await IdolImage.update({ img: idolImage }, { where: { id: imgId } }) // 이미지 교체
            res.status(200).json({ message: "Success replace img" });

        }catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        };
    }


};
  
module.exports = DbSaveController;


// const SpotifyWebApi = require('spotify-web-api-node');
// require("dotenv").config();
// const axios = require('axios');

// const apiKey = "1ed3b1822d54eaabface2784f632371a";
// const searchQuery = "BTS";
// const limit = 1;

// const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchQuery}&api_key=${apiKey}&format=json&limit=${limit}`;

// class RankController {

//     searchArtists = async (req, res, next) => {
//         try {
//             const response = await axios.get(apiUrl);
//             const artists = response.data.results.artistmatches.artist;
//             artists.forEach((artist) => {
//                 const name = artist.name;
//                 const imageUrl = artist.image[3]["#text"]; // 4번째 이미지 사용
//                 const mbid = artist.mbid;
//                 console.log(`Name: ${name}, Image URL: ${imageUrl}, MBID: ${mbid}`);
//             });
//             res.json({ message: "Search succeeded", data: artists });
            
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ message: "Search failed", error: error });
//         }
//     }
// }

// module.exports = RankController;



// const SpotifyWebApi = require('spotify-web-api-node');
// require("dotenv").config();
// const axios = require('axios');

// class RankController {
    
//     spotifyWebApi = new SpotifyWebApi({
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     });

//     async getToken() {
//         const authOptions = {
//             method: 'post',
//             url: 'https://accounts.spotify.com/api/token',
//             headers: {
//                 'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             params: {
//                 grant_type: 'client_credentials'
//             },
//             json: true
//         };
//         const response = await axios(authOptions);
//         return response.data.access_token;
//     }
    
//     searchArtists = async (req, res, next) => {
//         try {
//             // API에 액세스하기 위해 인증 정보 설정
//             const access_token = await this.getToken();
//             console.log('The access token is ' + access_token);

//             // API에 액세스하기 위한 인증 정보 설정
//             this.spotifyWebApi.setAccessToken(access_token);

//             // k-Pop 아티스트 데이터 검색
//             const result = await this.spotifyWebApi.searchArtists('k-pop', { limit: 10 });
//             console.log('Search artists by "k-pop"');
//             console.log(result.body.artists.items);

//         } catch (error) {
//             console.error('SpotifyApi Something went wrong!', error);
//         }
//     }
// }

// module.exports = RankController;


// const SpotifyWebApi = require('spotify-web-api-node');
// require("dotenv").config();

// // Spotify API에 액세스하기 위한 인증 정보 입력

// class RankController {
    
//     spotifyWebApi = new SpotifyWebApi({
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     });
    
//     searchArtists = async (req, res, next) => {
//         try {
//             // API에 액세스하기 위해 인증 정보 설정
//             const data = await this.spotifyWebApi.clientCredentialsGrant();
//             console.log('The access token expires in ' + data.body['expires_in']);
//             console.log('The access token is ' + data.body['access_token']);

//             // API에 액세스하기 위한 인증 정보 설정
//             this.spotifyWebApi.setAccessToken(data.body['access_token']);

//             // k-Pop 아티스트 데이터 검색
//             const result = await this.spotifyWebApi.searchArtists('k-Pop');
//             console.log('Search artists by "k-Pop"');
//             console.log(result.body[0]);

//         } catch (error) {
//             console.error('SpotifyApi Something went wrong!', error);
//         }
//     }
// }

// module.exports = RankController;

