const express = require('express');
const router  = express.Router();

const SpotifyScoreController = require('../architecture/controllers/rank.controllers/spotify.score.controller');
const spotifyScoreController = new SpotifyScoreController();

const YoutubeScoreController = require('../architecture/controllers/rank.controllers/youtube.score.controller');
const youtubeScoreController = new YoutubeScoreController();

const InstaScoreController = require('../architecture/controllers/rank.controllers/insta.score.controller');
const instaScoreController = new InstaScoreController();

const GoogleScoreController = require('../architecture/controllers/rank.controllers/google.score.controller');
const googleScoreController = new GoogleScoreController();

const OverallScoreController = require('../architecture/controllers/rank.controllers/overall.score.controller');
const overallScoreController = new OverallScoreController();

router.put('/updateIdolScore', spotifyScoreController.saveSpotifyScore);


module.exports = router;