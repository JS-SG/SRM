const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/subject.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

router.get('/', SubjectController.getAllSubjects);
router.get('/standard-mappings', SubjectController.getStandardSubjects);
router.get('/:id', SubjectController.getSubjectById);

router.post('/', checkPermission(permissions.ACADEMIC_MANAGE), SubjectController.createSubject);
router.put('/:id', checkPermission(permissions.ACADEMIC_MANAGE), SubjectController.updateSubject);
router.post('/map-standard', checkPermission(permissions.ACADEMIC_MANAGE), SubjectController.mapSubjectToStandard);
router.delete('/map-standard/:standard_id/:subject_id', checkPermission(permissions.ACADEMIC_MANAGE), SubjectController.removeSubjectFromStandard);

module.exports = router;
