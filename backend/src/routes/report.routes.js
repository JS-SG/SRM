const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/class-exam', checkPermission(permissions.REPORT_VIEW), ReportController.getClassExamReport);
router.get('/fee-summary', checkPermission(permissions.REPORT_VIEW), ReportController.getFeeSummaryReport);

module.exports = router;
