const express = require('express');
const router  = express.Router();

const KpopNewsSaveController = require('../architecture/controllers/kpop.news.controllers/kpop.news.save.controller')
const KpopNewsGetController  = require('../architecture/controllers/kpop.news.controllers/kpop.news.get.controller')

const kpopNewsSaveController = new KpopNewsSaveController();
const kpopNewsGetController  = new KpopNewsGetController();

router.post('/saveKpopNews', kpopNewsSaveController.saveKpopNews)  // GET /news/saveKpopNews
router.get('/getKpopNews', kpopNewsGetController.getKpopNews)
module.exports = router;