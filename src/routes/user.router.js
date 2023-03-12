const express = require('express');
const router  = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth')

const UserController = require('../architecture/controllers/user.controller');
const userController = new UserController();

router.post('/likeVideo', isLoggedIn, userController.saveLikeVideo);
router.post('/checkLikevideo', isLoggedIn, userController.existLikevideo);
router.delete('/deleteLikeVideo', isLoggedIn, userController.deleteLikeVideo);

module.exports = router;