const express = require('express');
const router  = express.Router();

const StartSearchVideoController = require('../architecture/controllers/search.video.controller/start.search.video.controller');
const startSearchVideoController = new StartSearchVideoController();

const QuerySearchVideoController = require('../architecture/controllers/search.video.controller/query.search.video.controller');
const querySearchVideoController = new QuerySearchVideoController();

const GetVideoInfoController = require('../architecture/controllers/search.video.controller/get.video.info.controller');
const getVideoInfoController = new GetVideoInfoController();

router.get ('/startSearch' , startSearchVideoController.startSearchVideo);   // GET  /video/startSearch
router.post('/search'      , querySearchVideoController.querySearchVideo);   // POST /video/search   
router.post('/getVideoInfo', getVideoInfoController.getVideoInfo);        // POST /video/getVideoInfo

module.exports = router;