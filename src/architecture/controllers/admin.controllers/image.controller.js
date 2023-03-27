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
            return
            // res.status(200).json({ message: "Success saving spotify img" });

        } catch (error) {
            console.error(error);
            next();
            // res.status(500).json({ message: "spotify img save failed", error: error });
        };
    };

    replaceIdolImg = async (req, res, next) => {
        try {
            const { imgId, idolImage } = req.body
            await this.imageService.replaceIdolImg(imgId, idolImage); // 이미지 교체
            res.status(200).json({ message: "Success replace img" });

        }catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        };
    }
}

module.exports = ImageConrtoller;