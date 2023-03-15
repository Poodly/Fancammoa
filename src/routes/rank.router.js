const express = require('express');
const router  = express.Router();

const SpotifyScoreController = require('../architecture/controllers/rank.controllers/spotify.score.controller');
const spotifyScoreController = new SpotifyScoreController();

router.get('/SpotifyfollowerCountTestURL', spotifyScoreController.GetSpotifyfollowerCount);

module.exports = router;