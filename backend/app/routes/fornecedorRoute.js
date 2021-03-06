const express = require('express');
const router = express.Router();
const controller = require('../controllers/fornecedoresController');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;