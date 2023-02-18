const express = require('express');
const router  = express.Router();

const Render = require('../src/controllers/pages.controller')
const render = new Render();

router.get('/', render.main)           // GET /
router.get('/login', render.login)     // GET /login
router.get('/signUp', render.sginUp)   // GET /signUp

module.exports = router;