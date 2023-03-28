const express = require('express');
const router  = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth')
const AuthController = require('../architecture/controllers/auth.controllers/auth.controller')
const authController = new AuthController();

router.post('/login'     , isNotLoggedIn , authController.login)        // POST /auth/login
router.post('/signUp'    , isNotLoggedIn , authController.signUp)       // POST /auth/signUp    
router.post('/withdrawal', isLoggedIn    , authController.withdrawal);  // POST /auth/withdrawal
router.get ('/logout'    , isLoggedIn    , authController.logout)       // GET  /auth/logout 

router.get('/checkAdmin' , isLoggedIn    , authController.checkAdmin);  // GET  /auth/checkAdmin 

module.exports = router;