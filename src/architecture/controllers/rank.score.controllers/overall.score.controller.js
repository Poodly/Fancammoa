const OverallScoreService = require('../../services/rank.score.services/overall.score.service');

class OverallScoreController {
    overallScoreService = new OverallScoreService();

    saveOverallScore = async (req, res, next) => {
        try {
            await this.overallScoreService.saveOverallScore();
            res.status(200).json({ message: "Success saving overall score !!" });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        };
    };

    getOverallScore = async (req, res, next) => {
        try {
            const ScoreDataArr = await this.overallScoreService.getOverallScore();
            res.status(200).json({ data: ScoreDataArr })

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        };
    }
};

module.exports = OverallScoreController;