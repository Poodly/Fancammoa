const express = require('express');
const router  = express.Router();

const SpotifyScoreController = require('../architecture/controllers/rank.controllers/spotify.score.controller');
const YoutubeScoreController = require('../architecture/controllers/rank.controllers/youtube.score.controller');
const InstaScoreController   = require('../architecture/controllers/rank.controllers/insta.score.controller');
const GoogleScoreController  = require('../architecture/controllers/rank.controllers/google.score.controller');
const OverallScoreController = require('../architecture/controllers/rank.controllers/overall.score.controller');
const RankInfoController     = require('../architecture/controllers/rank.controllers/rank.info.controller');
const DbSaveController       = require('../architecture/controllers/db.save.controllers/db.save.controller');

const spotifyScoreController = new SpotifyScoreController();
const youtubeScoreController = new YoutubeScoreController();
const instaScoreController   = new InstaScoreController();
const googleScoreController  = new GoogleScoreController();
const overallScoreController = new OverallScoreController();
const rankInfoController     = new RankInfoController();
const dbSaveController       = new DbSaveController();

const { isLoggedIn } = require('../middlewares/auth');
const { onlyAdmin  } = require('../middlewares/auth');

router.put('/updateYoutubeScore', onlyAdmin, isLoggedIn, youtubeScoreController.saveYoutubeScore);  // /admin/updateYoutubeScore
router.put('/updateSpotifyScore', onlyAdmin, isLoggedIn, spotifyScoreController.saveSpotifyScore);  // /admin/updateSpotifyScore

router.put('/IndividualUpdateYoutube', onlyAdmin, isLoggedIn, youtubeScoreController.IndividualSaveYoutubeScore);  // /admin/queryYpdateyoutube
router.put('/IndividualUpdateSpotify', onlyAdmin, isLoggedIn, spotifyScoreController.IndividualUpdateSpotify);  // /admin/updateSpotifyScore

router.put('/updateOverallScore', onlyAdmin, isLoggedIn, overallScoreController.saveOverallScore);  // /admin/updateOverallScore
router.get('/getOverallScore'   , onlyAdmin, isLoggedIn, overallScoreController.getOverallScore);   // /admin/getOverallScore

// get img,score,name.....
router.get('/getRankInfoItems'  , onlyAdmin, isLoggedIn, rankInfoController.getRankInfoItems);      // /admin/getRankInfoItems
router.post('/craeteIdol'       , onlyAdmin, isLoggedIn, rankInfoController.craeteIdol);            // /admin/updateIdolScore
router.put('/updateIdolScore'   , onlyAdmin, isLoggedIn, rankInfoController.updateIdolScore);       // /admin/updateIdolScore
router.delete('/deleteIdol'     , onlyAdmin, isLoggedIn, rankInfoController.deleteIdol);            // /admin/updateIdolScore
router.put('/replaceIdolImg'    , onlyAdmin, isLoggedIn, dbSaveController.replaceIdolImg);          // /admin/updateIdolScore


module.exports = router;