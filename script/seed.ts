const {
  db,
  models: { Player },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const players = await Promise.all([
    Player.create({
      name: 'alice',
      score: 200,
      completedTime: '4 min 25 sec',
    }),
    Player.create({
      name: 'bob',
      score: 185,
      completedTime: '3 min 15 sec',
    }),
    Player.create({
      name: 'charlie',
      score: 225,
      completedTime: '5 min 30 sec',
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
