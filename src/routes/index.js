const { Router } = require('express');
const routes = Router();

// Routes
routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/users', require('./users.routes'));
routes.use('/api/roles', require('./roles.routes'));

module.exports = routes;