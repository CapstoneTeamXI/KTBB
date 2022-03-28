const router = require('express').Router();

router.use('/players', require('./players'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  res.status = 404;
  next(error);
});

module.exports = router;
