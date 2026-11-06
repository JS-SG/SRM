const express = require('express');
const router = express.Router();
const AcademicController = require('../controllers/academic.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

// Academic Years
router.get('/years', AcademicController.getAcademicYears);
router.post('/years', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.createAcademicYear);
router.patch('/years/:id/current', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.setCurrentAcademicYear);

// Standards & Divisions
router.get('/standards', AcademicController.getStandards);
router.post('/standards', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.createStandard);
router.get('/divisions', AcademicController.getDivisions);
router.post('/divisions', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.createDivision);

// Classes
router.get('/classes', AcademicController.getClasses);
router.get('/classes/:id', AcademicController.getClassById);
router.post('/classes', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.createClass);
router.put('/classes/:id', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.updateClass);
router.post('/classes/batch', checkPermission(permissions.ACADEMIC_MANAGE), AcademicController.batchCreateClasses);

module.exports = router;
