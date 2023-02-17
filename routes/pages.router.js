const express = require('express');
const router  = express.Router();

const { renderMain } = require('../src/controllers/pages.controller')

router.get('/', renderMain) // GET /

module.exports = router;