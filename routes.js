const user = require('./api/user');
const fav = require('./api/favs');
const authLocal = require('./auth/local');

function routes(app) {
  app.use('/api/users', user);
  app.use('/api/favs', fav);
  app.use('/auth/local', authLocal);
}

module.exports = routes;
