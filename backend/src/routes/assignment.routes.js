const express = require('express');
const router = express.Router();
const AssignmentController = require('../controllers/assignment.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/class/:class_id', AssignmentController.getAssignmentsByClass);
router.get('/staff/:staff_id?', AssignmentController.getAssignmentsByStaff);
router.post('/', checkPermission(permissions.CLASS_ASSIGN), AssignmentController.assignTeacher);
router.delete('/:id', checkPermission(permissions.CLASS_ASSIGN), AssignmentController.removeAssignment);

module.exports = router;
