const LastFmSearchArtistService = require('../../services/admin.services/lastFmSearchArtist.service');
const ImageConrtoller = require('../../controllers/admin.controllers/image.controller');

class LastFmSearchArtistController {

    lastFmSearchArtistService = new LastFmSearchArtistService();
    imageConrtoller = new ImageConrtoller();

    // Last Fm API
    lastFmSearchArtist = async (req, res, next) => {
        try {
            const response = await this.lastFmSearchArtistService.lastFmSearchArtist();
            await this.imageConrtoller.saveSpotifyImg();
            // res.status(200).json({ message: "Db save succeeded" });
            res.status(200).json({ message: response });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Last Fm API artist Search failed or db save failed", error: error });
        }
    };
};
  
module.exports = LastFmSearchArtistController;