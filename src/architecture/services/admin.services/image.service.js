require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyAccessTokenService = require('../spotify.access.token.service');
const ImageRepository = require('../../repositories/admin.repositories/image.repository');

class ImageService {
    imageRepository = new ImageRepository();

    spotifyAccessTokenService = new SpotifyAccessTokenService();
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    // Spotify API
    saveSpotifyImg = async () => {
        try {
            const idolNamesArr = await this.imageRepository.getIdolDatas(); // 아이돌 이름을 배열형태로 받습니다.

            for (let i = 0; i < idolNamesArr.length; i++) {
                try {
                    const idolId   = idolNamesArr[i].idolId
                    const idolName = idolNamesArr[i].idolName

                    const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                        process.env.SPOTIFY_CLIENT_ID, 
                        process.env.SPOTIFY_CLIENT_SECRET
                        );                                                                           // API에 액세스하기 위해 인증 정보 설정
                    this.spotifyWebApi.setAccessToken(access_token);                                 // API에 액세스하기 위한 인증 정보 설정

                    const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });   // 특정 아티스트 데이터 검색
                    const img    = result.body.artists.items[0].images[0].url;

                    await this.imageRepository.createImg(img, idolId);
                }
                catch (error) {
                    console.log(`spotify 검색결과가 없습니다.`);
                    console.error(error);
                }
            }
            return
        } catch (error) {
            console.error(error);
            next();
        };
    };

    replaceIdolImg = async (imgId, idolImage) => {
        try {
            await this.imageRepository.replaceIdolImg(imgId, idolImage);   // 이미지 교체
            return

        }catch (error) {
            console.log(error);
            next();
        };
    };

    querySaveSpotifyImg = async (idolId, idolName) => {
        try {
            const access_token = await this.spotifyAccessTokenService.SpotifyAccessToken(
                process.env.SPOTIFY_CLIENT_ID, 
                process.env.SPOTIFY_CLIENT_SECRET
                );                                                                           // API에 액세스하기 위해 인증 정보 설정
            this.spotifyWebApi.setAccessToken(access_token);                                 // API에 액세스하기 위한 인증 정보 설정
            const result = await this.spotifyWebApi.searchArtists(idolName, { limit: 1 });   // 특정 아티스트 데이터 검색

            const img = result.body.artists.items[0].images[0].url;
            await this.imageRepository.createImg(img, idolId);                               // 스포티파이 단일 이미지 저장
            return

        } catch (error) {
            console.log(error);
            next();
        };
    }
}

module.exports = ImageService;