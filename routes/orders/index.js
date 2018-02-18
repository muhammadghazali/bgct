var express = require('express');
var router = express.Router();
const createOrder = require('./create-order');
const deleteOrder = require('./delete-order');
const listOrder = require('./list-order');

router.post('/', createOrder);
router.get('/', listOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
