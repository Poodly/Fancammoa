const express = require('express');
const router  = express.Router();

const KpopNewsGetController  = require('../architecture/controllers/kpop.news.controllers/kpop.news.get.controller')
const kpopNewsGetController  = new KpopNewsGetController();

router.get('/getTop3KpopNews', kpopNewsGetController.getTop3KpopNews);   // /news/getTop3KpopNews
router.get('/getKpopNews'    , kpopNewsGetController.getKpopNews);       // /news/getKpopNews

module.exports = router;