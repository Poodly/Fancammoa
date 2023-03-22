const express = require('express');
const router  = express.Router();

const LastFmSearchArtistController = require('../architecture/controllers/admin.controllers/lastFmSearchArtist.controller');
const SpotifyScoreController = require('../architecture/controllers/rank.score.controllers/spotify.score.controller');
const YoutubeScoreController = require('../architecture/controllers/rank.score.controllers/youtube.score.controller');
const InstaScoreController   = require('../architecture/controllers/rank.score.controllers/insta.score.controller');
const GoogleScoreController  = require('../architecture/controllers/rank.score.controllers/google.score.controller');
const RankInfoController     = require('../architecture/controllers/rank.score.controllers/rank.info.controller');
const OverallScoreController = require('../architecture/controllers/rank.score.controllers/overall.score.controller');
const SaveKeywordController  = require('../architecture/controllers/admin.controllers/keyword.controller');
const ImageConrtoller        = require('../architecture/controllers/admin.controllers/image.controller');
const IdolInfoController     = require('../architecture/controllers/admin.controllers/idol.info.controller');

const lastFmSearchArtistController = new LastFmSearchArtistController();
const spotifyScoreController = new SpotifyScoreController();
const youtubeScoreController = new YoutubeScoreController();
const instaScoreController   = new InstaScoreController();
const googleScoreController  = new GoogleScoreController();
const rankInfoController     = new RankInfoController();
const overallScoreController = new OverallScoreController();
const saveKeywordController  = new SaveKeywordController();
const imageConrtoller        = new ImageConrtoller();
const idolInfoController     = new IdolInfoController();

const { isLoggedIn } = require('../middlewares/auth');
const { onlyAdmin  } = require('../middlewares/auth');

// 점수 전체 업데이트 관련
router.put('/updateYoutubeScore', onlyAdmin, isLoggedIn, youtubeScoreController.saveYoutubeScore);  // /admin/updateYoutubeScore
router.put('/updateSpotifyScore', onlyAdmin, isLoggedIn, spotifyScoreController.saveSpotifyScore);  // /admin/updateSpotifyScore
router.put('/updateOverallScore', onlyAdmin, isLoggedIn, overallScoreController.saveOverallScore);  // /admin/updateOverallScore

// 점수 개별 업데이트 관련
router.put('/IndividualUpdateYoutube', onlyAdmin, isLoggedIn, youtubeScoreController.IndividualSaveYoutubeScore);  // /admin/queryYpdateyoutube
router.put('/IndividualUpdateSpotify', onlyAdmin, isLoggedIn, spotifyScoreController.IndividualUpdateSpotify);     // /admin/updateSpotifyScore

// 종합점수 가져오기
router.get('/getOverallScore'   , onlyAdmin, isLoggedIn, overallScoreController.getOverallScore);   // /admin/getOverallScore

// get img,score,name.....
router.get('/getRankInfoItems'  , onlyAdmin, isLoggedIn, rankInfoController.getRankInfoItems);    // /admin/getRankInfoItems

// 아이돌 생성, 수정, 삭제
router.post('/craeteIdol'       , onlyAdmin, isLoggedIn, idolInfoController.craeteIdol);          // /admin/craeteIdol
router.put('/updateIdolScore'   , onlyAdmin, isLoggedIn, idolInfoController.updateIdolScore);     // /admin/updateIdolScore
router.delete('/deleteIdol'     , onlyAdmin, isLoggedIn, idolInfoController.deleteIdol);          // /admin/deleteIdol

// 이미지 교체
router.put('/replaceIdolImg'    , onlyAdmin, isLoggedIn, imageConrtoller.replaceIdolImg);         // /admin/replaceIdolImg

// 키워드 관련
router.post('/saveKeywords'    , saveKeywordController.saveKeywords);    // /admin/saveKeywords   
router.get('/getKeywords'      , saveKeywordController.getKeywords);     // /admin/getKeywords   
router.put('/editKeywords'     , saveKeywordController.editKeywords);    // /admin/editKeywords   
router.delete('/deleteKeyword' , saveKeywordController.deleteKeyword);   // /admin/deleteKeyword   

// 아티스트 일괄생성
router.get('/artistDbSave' , lastFmSearchArtistController.lastFmSearchArtist);  // /admin/artistDbSave

module.exports = router;