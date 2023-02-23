const express = require('express');
const router  = express.Router();

const Render = require('../src/controllers/pages.controller')
const render = new Render();

const { isLoggedIn   , isNotLoggedIn } = require('../middlewares/auth');
const { onlyGeneral  , onlyAdmin }     = require('../middlewares/auth');

// User's Data
router.use((req, res, next) => {
    res.locals.user = req.user;
    console.log("req.user------------",req.user)
    next();
})

router.get('/'      , render.main)                      // GET /
router.get('/login' , isNotLoggedIn , render.login)     // GET /signUp
router.get('/signUp', isNotLoggedIn , render.sginUp)    // GET /signUp

module.exports = router;