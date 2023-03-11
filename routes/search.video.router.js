const express = require('express');
const router  = express.Router();

const SearchYoutubeVideo = require('../src/controllers/search.video.controller');
const searchYoutubeVideo = new SearchYoutubeVideo();

// API 요청을 처리할 라우터
router.get ('/startSearch' , searchYoutubeVideo.startSearchVideo);     // GET  /video/startSearch
router.post('/search'      , searchYoutubeVideo.searchVideo);          // POST /video/search   
router.post('/getVideoInfo', searchYoutubeVideo.getVideoInfo)          // POST /video/getVideoInfo

module.exports = router;