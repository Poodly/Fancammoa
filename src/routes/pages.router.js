const express = require('express');
const router  = express.Router();

const Render = require('../architecture/controllers/pages.controller')
const render = new Render();

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const { onlyAdmin } = require('../middlewares/auth');

// User's Data
router.use((req, res, next) => {
    res.locals.user = req.user;
    // console.log("req.user------------",req.user)
    next();
})

router.get('/'           , render.main)                          // GET /
router.get('/login'      , isNotLoggedIn , render.login)         // GET /login
router.get('/signUp'     , isNotLoggedIn , render.sginUp)        // GET /signUp

router.get('/idolRank'    , render.idolRank)                     // GET /idolRank
router.get('/kpopNews'    , render.kpopNews)                     // GET /kpopNews

// router.get('/idolProfile' , render.idolProfile)               // GET /idolProfile
router.get('/userProfile' , isLoggedIn , render.userProfile)     // GET /userProfile

router.get('/adminPage'        , onlyAdmin  , isLoggedIn , render.adminPage)          // GET /adminPage
router.get('/adminPageImg'     , onlyAdmin  , isLoggedIn , render.adminPageImg)       // GET /adminPage
router.get('/adminPageKeywords', onlyAdmin  , isLoggedIn , render.adminPageKeywords)  // GET /adminPage

module.exports = router;