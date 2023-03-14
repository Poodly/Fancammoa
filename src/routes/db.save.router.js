const express = require('express');
const router  = express.Router();

const DbSaveController = require('../architecture/controllers/db.save.controllers/db.save.controller');
const dbSaveController = new DbSaveController();

router.get('/artistDbSave', dbSaveController.searchArtistsDbSave);

module.exports = router;