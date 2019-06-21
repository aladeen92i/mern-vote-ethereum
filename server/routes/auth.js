const router = require('express').Router();
const handle = require('../handlers');


router.post('/register', handle.register);
router.post('/login', handle.login);
router.post('/confirmation', handle.confirmation);
// router.post('/resend', handle.resend);

module.exports = router;