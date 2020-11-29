const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.post('/', controller.post);
router.put('/:barcode', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;