const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireAdmin, checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/permissions/all', checkPermission(permissions.PERMISSION_MANAGE), UserController.getAllPermissions);
router.get('/', requireAdmin, UserController.getAllUsers);
router.get('/:id/permissions', checkPermission(permissions.PERMISSION_MANAGE), UserController.getUserPermissions);
router.put('/:id/permissions', checkPermission(permissions.PERMISSION_MANAGE), UserController.updateUserPermissions);
router.patch('/:id/status', requireAdmin, UserController.toggleStatus);

module.exports = router;
