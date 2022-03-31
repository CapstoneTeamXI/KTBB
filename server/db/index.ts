import { db } from './db';
const Player = require('./models/Player');

module.exports = {
  db,
  models: {
    Player,
  },
};
