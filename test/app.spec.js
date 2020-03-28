const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200"', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(200);
  });
});
