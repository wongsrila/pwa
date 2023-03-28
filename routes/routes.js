const express = require('express');
const indexController = require('../controllers/indexController.js');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/product/:barcode', indexController.productGet);
router.get('/scanner', indexController.scannerGet);
router.get('/result/:barcode', indexController.resultGet);
router.post('/save', indexController.savePost);

module.exports = router;
