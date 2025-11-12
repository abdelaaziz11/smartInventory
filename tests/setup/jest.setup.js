const db = require('./test-db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.closeDatabase();
});

// after each test clearDatabase
afterEach(async () => {
  await db.clearDatabase();
});