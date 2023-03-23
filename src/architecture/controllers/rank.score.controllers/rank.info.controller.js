const RankInfoService = require('../../services/rank.score.services/rank.info.service');

class RankInfoController {
    rankInfoService = new RankInfoService();
  
    getRankInfoAllItems = async (req, res, next) => {
        try {
            const RankInfoItems = await this.rankInfoService.getRankInfoAllItems();
            res.status(200).json({ RankInfoItems });

        }catch (error) {
            console.error(error);
            res.status(400).json({ message: error });
        };
    };
};

module.exports = RankInfoController;