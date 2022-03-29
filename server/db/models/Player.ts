import Sequelize from 'sequelize';
// const Sequelize = require('sequelize');
// const db = require('../db');
import { db } from '../db';

const Player = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  completedTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Player;
