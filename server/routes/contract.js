const router = require('express').Router();
const handle = require('../handlers');

router.get('/contract', handle.getString);


module.exports = router;