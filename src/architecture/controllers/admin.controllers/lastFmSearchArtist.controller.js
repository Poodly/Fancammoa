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

        }catch (err) {
            console.error(err);
            next(err)
        };
    };
};
  
module.exports = LastFmSearchArtistController;