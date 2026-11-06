const express = require('express');
const router = express.Router();
const FeeController = require('../controllers/fee.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../middlewares/permission.middleware');
const permissions = require('../constants/permissions');

router.use(authenticate);

// Fee types
router.get('/types', FeeController.getFeeTypes);
router.post('/types', checkPermission(permissions.FEES_CREATE), FeeController.createFeeType);

// Student fees list
router.get('/student-fees', checkPermission(permissions.FEES_VIEW), FeeController.getStudentFees);
router.post('/assign', checkPermission(permissions.FEES_CREATE), FeeController.assignFee);

// Payment collection
router.post('/payments', checkPermission(permissions.PAYMENT_COLLECT), FeeController.recordPayment);

module.exports = router;
