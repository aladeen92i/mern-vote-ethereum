const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');

router
  .route('/')
  .get(auth, handle.showString);
  //.post(auth, deployContract);

module.exports = router;