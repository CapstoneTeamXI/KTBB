import { NextFunction } from 'express';
import createError from 'http-errors';

const router = require('express').Router();

router.use('/players', require('./players'));

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = createError(404, 'Not Found');
  next(error);
});

module.exports = router;
