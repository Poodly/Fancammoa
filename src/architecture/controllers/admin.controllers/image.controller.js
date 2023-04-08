require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyAccessTokenService = require('../../services/spotify.access.token.service');
const ImageService = require('../../services/admin.services/image.service');

class ImageConrtoller {
    imageService = new ImageService();

    spotifyAccessTokenService = new SpotifyAccessTokenService();
    spotifyWebApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    // Spotify API
    saveSpotifyImg = async (req, res, next) => {
        try {
            await this.imageService.saveSpotifyImg();
            res.status(200).json({ message: "Success saving spotify img" });

        }catch (err) {
            console.error(err);
            next(err)
        };
    };

    replaceIdolImg = async (req, res, next) => {
        try {
            const { imgId, idolImage } = req.body
            await this.imageService.replaceIdolImg(imgId, idolImage); // 이미지 교체
            res.status(200).json({ message: "Success replace img" });

        }catch (err) {
            console.error(err);
            next(err)
        };
    }
}

module.exports = ImageConrtoller;