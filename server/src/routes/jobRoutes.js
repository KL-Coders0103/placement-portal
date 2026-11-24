const express = require('express');
const router = express.Router();
const {protect, authorize} = require('../middlewares/authMiddleware');
const { createJob, getJobs, getJobsById } = require('../controllers/jobController');

router.post("/", protect, authorize("admin"), createJob);
router.get("/", protect, getJobs);
router.get("/:jobId", protect, getJobsById);

module.exports = router;