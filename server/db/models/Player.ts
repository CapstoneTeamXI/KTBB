import Sequelize from 'sequelize';
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Player;
