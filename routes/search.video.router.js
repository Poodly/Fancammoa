const express = require('express');
const router  = express.Router();

const StartSearchVideoController = require('../src/controllers/search.video.controller/start.search.video.controller');
const startSearchVideoController = new StartSearchVideoController();

const QuerySearchVideoController = require('../src/controllers/search.video.controller/query.search.video.controller');
const querySearchVideoController = new QuerySearchVideoController();

const GetVideoInfoController = require('../src/controllers/search.video.controller/get.video.info.controller');
const getVideoInfoController = new GetVideoInfoController();

router.get ('/startSearch' , startSearchVideoController.startSearchVideo);   // GET  /video/startSearch
router.post('/search'      , querySearchVideoController.querySearchVideo);   // POST /video/search   
router.post('/getVideoInfo', getVideoInfoController.getVideoInfo);        // POST /video/getVideoInfo

module.exports = router;