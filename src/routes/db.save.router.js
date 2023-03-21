const express = require('express');
const router  = express.Router();

const DbSaveController      = require('../architecture/controllers/db.save.controllers/db.save.controller');
const dbSaveController      = new DbSaveController();

router.get('/artistDbSave' , dbSaveController.searchArtistsDbSave);  // GET /save/artistDbSave
router.get('/artistImgSave', dbSaveController.saveSpotifyImg);       // GET /save/artistImgSave   

module.exports = router;