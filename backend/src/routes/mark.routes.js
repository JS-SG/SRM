const express = require('express');
const router = express.Router();
const MarkController = require('../controllers/mark.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const { checkClassSubjectScope } = require('../middlewares/scope.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

// Get marks matrix for class + exam + subject
router.get(
  '/matrix',
  checkPermission([permissions.MARKS_VIEW, permissions.MARKS_UPDATE]),
  checkClassSubjectScope,
  MarkController.getClassMarksMatrix
);

// Save marks (scoped: validates teacher assigned to class and subject)
router.post(
  '/',
  checkPermission([permissions.MARKS_CREATE, permissions.MARKS_UPDATE]),
  checkClassSubjectScope,
  MarkController.saveMarks
);

// Student marksheet
router.get(
  '/student/:enrollment_id',
  checkPermission([permissions.MARKS_VIEW, permissions.STUDENT_VIEW]),
  MarkController.getStudentMarksheet
);

module.exports = router;
