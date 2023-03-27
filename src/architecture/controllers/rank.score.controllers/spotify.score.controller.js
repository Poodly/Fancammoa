const SpotifyScoreService = require('../../services/rank.score.services/spotify.score.service');

class SpotifyScoreController {
    spotifyScoreService = new SpotifyScoreService();

    saveSpotifyScore = async (req, res, next) => {
        try {
            const spotifyArr = await this.spotifyScoreService.saveSpotifyScore();
            res.status(200).json({ data: spotifyArr })

        } catch (error) {
            console.error(error)
            res.status(400).json({ message: error });
        }
    }

    IndividualUpdateSpotify = async (req, res, next) => {
        try {
            const { idolId } = req.body; 
            const followers = await this.spotifyScoreService.IndividualUpdateSpotify(idolId);
            res.status(200).json({ data: followers })
            
        }catch (error) {
            console.error(error)
            res.status(400).json({ message: error });
        }
    }
}

module.exports = SpotifyScoreController;