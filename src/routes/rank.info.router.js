const express = require('express');
const router  = express.Router();

const OverallScoreController = require('../architecture/controllers/rank.score.controllers/overall.score.controller');
const RankInfoController     = require('../architecture/controllers/rank.score.controllers/rank.info.controller');

const overallScoreController = new OverallScoreController();
const rankInfoController     = new RankInfoController();

// get img,score,name.....
router.get('/getRankInfoItems', rankInfoController.getRankInfoAllItems);      // /rank/getRankInfoItems
router.get('/getOverallScore' , overallScoreController.getOverallScore);      // /rank/getOverallScore

module.exports = router;