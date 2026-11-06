const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const staffRoutes = require('./staff.routes');
const academicRoutes = require('./academic.routes');
const studentRoutes = require('./student.routes');
const subjectRoutes = require('./subject.routes');
const assignmentRoutes = require('./assignment.routes');
const examRoutes = require('./exam.routes');
const markRoutes = require('./mark.routes');
const feeRoutes = require('./fee.routes');
const notificationRoutes = require('./notification.routes');
const reportRoutes = require('./report.routes');
const auditRoutes = require('./audit.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/staff', staffRoutes);
router.use('/academic', academicRoutes);
router.use('/students', studentRoutes);
router.use('/subjects', subjectRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/exams', examRoutes);
router.use('/marks', markRoutes);
router.use('/fees', feeRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRoutes);
router.use('/audit', auditRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
