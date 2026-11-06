const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/', checkPermission(permissions.STAFF_VIEW), StaffController.getAllStaff);
router.get('/:id', checkPermission(permissions.STAFF_VIEW), StaffController.getStaffById);
router.post('/', checkPermission(permissions.STAFF_CREATE), StaffController.createStaff);
router.put('/:id', checkPermission(permissions.STAFF_UPDATE), StaffController.updateStaff);
router.delete('/:id', checkPermission(permissions.STAFF_DELETE), StaffController.deleteStaff);

module.exports = router;
