const express = require('express');
const router  = express.Router();

const { newsPickLogin } = require('../architecture/controllers/kpop.news.controllers/kpop.news.controller.js')
// import newsPickLogin from './kpop.news.controller.mjs';

router.get('/kpopNews', newsPickLogin)  // GET /news/kpopNews

module.exports = router;