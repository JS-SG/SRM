const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/', checkPermission(permissions.STUDENT_VIEW), StudentController.getAllStudents);
router.get('/:id', checkPermission(permissions.STUDENT_VIEW), StudentController.getStudentById);
router.post('/', checkPermission(permissions.STUDENT_CREATE), StudentController.createStudent);
router.put('/:id', checkPermission(permissions.STUDENT_UPDATE), StudentController.updateStudent);
router.post('/:id/parents', checkPermission(permissions.STUDENT_UPDATE), StudentController.addParent);
router.post('/:id/enroll', checkPermission(permissions.STUDENT_UPDATE), StudentController.enrollStudent);
router.patch('/:id/status', checkPermission(permissions.STUDENT_DELETE), StudentController.toggleStatus);

module.exports = router;
