const express = require('express');
const router = express.Router();
const AuditController = require('../controllers/audit.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/', checkPermission(permissions.AUDIT_VIEW), AuditController.getLogs);

module.exports = router;
