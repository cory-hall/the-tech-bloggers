// import router
const router = require('express').Router();
// import js files
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// create api routes
router.use('/api', apiRoutes);
// create home routes
router.use('/', homeRoutes);
// create dashboard routes
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;