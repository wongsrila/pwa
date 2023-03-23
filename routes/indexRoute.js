const express = require('express');
const indexController = require('../controllers/indexController.js');

const router = express.Router();

router.get('/', indexController.indexGet);
router.post('/scan', indexController.scanPost);
router.get('/result', indexController.resultGet);

module.exports = router;
