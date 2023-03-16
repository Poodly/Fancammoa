const express = require('express');
const router  = express.Router();

const SpotifyScoreController = require('../architecture/controllers/rank.controllers/spotify.score.controller');
const YoutubeScoreController = require('../architecture/controllers/rank.controllers/youtube.score.controller');
const InstaScoreController   = require('../architecture/controllers/rank.controllers/insta.score.controller');
const GoogleScoreController  = require('../architecture/controllers/rank.controllers/google.score.controller');
const OverallScoreController = require('../architecture/controllers/rank.controllers/overall.score.controller');
const GetRankInfoController  = require('../architecture/controllers/rank.controllers/get.rank.info.controller');

const spotifyScoreController = new SpotifyScoreController();
const youtubeScoreController = new YoutubeScoreController();
const instaScoreController   = new InstaScoreController();
const googleScoreController  = new GoogleScoreController();
const overallScoreController = new OverallScoreController();
const getRankInfoController  = new GetRankInfoController();


router.put('/updateSpotifyScore', spotifyScoreController.saveSpotifyScore);  // /rank/updateSpotifyScore

router.put('/updateyoutubeScore', youtubeScoreController.saveYoutubeScore);  // /rank/updateyoutubeScore

router.put('/updateOverallScore', overallScoreController.saveOverallScore);  // /rank/updateOverallScore
router.get('/getOverallScore'   , overallScoreController.getOverallScore);   // /rank/getOverallScore

// get img,score,name.....
router.get('/getRankInfoItems'  , getRankInfoController.getRankInfoItems);   // /rank/getRankInfoItems


module.exports = router;