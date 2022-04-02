const {
  db,
  models: { Player },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const players = await Promise.all([
    Player.create({
      name: 'Jeffy',
      score: 2500,
      completedTime: 85,
    }),
    Player.create({
      name: 'Vinh',
      score: 2500,
      completedTime: 4000,
    }),
    Player.create({
      name: 'Jake',
      score: 2500,
      completedTime: 3000,
    }),
    Player.create({
      name: 'Taz',
      score: 2600,
      completedTime: 59,
    }),
  ]);

  console.log(`seeded ${players.length} players`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
