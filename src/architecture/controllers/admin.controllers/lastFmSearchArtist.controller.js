const LastFmSearchArtistService = require('../../services/admin.services/lastFmSearchArtist.service');
const ImageService = require('../../services/admin.services/image.service');

class LastFmSearchArtistController {
    lastFmSearchArtistService = new LastFmSearchArtistService();
    imageService = new ImageService();

    // Last Fm API
    lastFmSearchArtist = async (req, res, next) => {
        try {
            const response = await this.lastFmSearchArtistService.lastFmSearchArtist();
            await this.imageService.saveSpotifyImg();
            res.status(200).json({ message: response });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Last Fm API artist Search failed or db save failed", error: error });
        }
    };
};
  
module.exports = LastFmSearchArtistController;