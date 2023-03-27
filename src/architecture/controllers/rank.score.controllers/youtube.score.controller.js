const YoutubeScoreService = require('../../services/rank.score.services/youtube.score.service');

class YoutubeScoreController {
    youtubeScoreService = new YoutubeScoreService();

    saveYoutubeScore = async (req, res, next) => {
        try {
            await this.youtubeScoreService.saveYoutubeScore();
            res.status(200).json({ message: "Success saving youtube score !!" });

        }catch (error) {
            console.error(error)
            res.status(500).json({ message: error });
        }
    };

    IndividualSaveYoutubeScore = async (req, res, next) => {
        try {
            const { idolId } = req.body; 
            const youtubeVideoScore = await this.youtubeScoreService.IndividualSaveYoutubeScore(idolId);
            res.status(200).json({ data: youtubeVideoScore });
            
        }catch (error) {
            console.error(error)
            res.status(500).json({ message: error });
        }
    };
};

module.exports = YoutubeScoreController;