const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    applyJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/apply', protect, authorize('student'), applyJob);
router.get('/my', protect, authorize('student'), getMyApplications);
router.get('/job/:jobId', protect, authorize('admin'), getJobApplications);
router.put('/:applicationId/status', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;