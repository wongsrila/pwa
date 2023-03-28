const express = require('express');
const indexController = require('../controllers/indexController.js');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/scanner', indexController.scannerGet);
router.get('/result/:barcode', indexController.resultGet);

module.exports = router;
