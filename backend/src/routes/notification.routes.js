const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.post('/send', checkPermission(permissions.NOTIFICATION_SEND), NotificationController.sendSingle);
router.post('/send-bulk', checkPermission(permissions.NOTIFICATION_SEND), NotificationController.sendBulk);
router.get('/history', checkPermission(permissions.NOTIFICATION_VIEW), NotificationController.getHistory);

module.exports = router;
