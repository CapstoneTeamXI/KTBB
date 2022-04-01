import express from 'express';
const router = express.Router();

const {
  models: { Player },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    console.log('Hello??');
    const players = await Player.findAll({
      attributes: ['id', 'name', 'score', 'completedTime'],
      order: [['score', 'DESC']],
    });
    res.json(players);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.json(player);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
