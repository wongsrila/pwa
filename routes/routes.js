const express = require('express');
const indexController = require('../controllers/indexController');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.get('/', indexController.indexGet);
router.get('/product/:barcode', indexController.productGet);
router.get('/scanner', indexController.scannerGet);
router.get('/result/:barcode', indexController.resultGet);
router.post('/save', indexController.savePost);
router.post('/delete', indexController.deletePost);

// Acount Routes
router.get('/account', accountController.indexGet);

module.exports = router;
