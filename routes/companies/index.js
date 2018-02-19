var express = require('express');
var router = express.Router();

router.post('/', require('./create-company'));
router.put('/', require('./delete-company'));
router.get('/:id', require('./update-company'));
router.delete('/:id', require('./delete-company'));

module.exports = router;
