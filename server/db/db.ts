import { Sequelize } from 'sequelize';
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

interface Config {
  logging: boolean;
  dialectOptions: any;
}

const config: Config = {
  logging: false,
  dialectOptions: null,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export const db = new Sequelize(
  'postgres://nsgawefjqzlfyr:ce8c8a07441e493391ed' ||
    `postgres://localhost:5432/${databaseName}`,
  config
);
