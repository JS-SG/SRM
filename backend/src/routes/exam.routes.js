const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/', ExamController.getExams);
router.get('/:id', ExamController.getExamById);
router.post('/', checkPermission(permissions.EXAM_MANAGE), ExamController.createExam);
router.put('/:id', checkPermission(permissions.EXAM_MANAGE), ExamController.updateExam);

module.exports = router;
