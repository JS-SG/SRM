const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.use(authenticate);

router.get('/metrics', DashboardController.getDashboardMetrics);

module.exports = router;
