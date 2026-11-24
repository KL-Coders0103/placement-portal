const express = require('express');
const router = express.Router();
const {protect, authorize} = require('../middlewares/authMiddleware');
const { getProfile, upsertProfile, uploadResume: uploadResumeController } = require('../controllers/studentController');
const { uploadResume } = require('../middlewares/uploadMiddleware');

router.get('/profile', protect, authorize('student'), getProfile);
router.put('/profile', protect, authorize('student'), upsertProfile);
router.post('/resume', protect, authorize('student'), uploadResume.single('resume'), uploadResumeController);
module.exports = router;