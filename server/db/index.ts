// const db = require('./db');
import { db } from './db';
const Player = require('./models/Player');

//associations could go here!

module.exports = {
  db,
  models: {
    Player,
  },
};
