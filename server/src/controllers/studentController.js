const StudentProfile = require('../models/StudentProfile');

const getProfile = async (req,res) => {
    try {
        const profile = await StudentProfile.findOne({ userId: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const upsertProfile = async (req, res) => {
    try {
        const data = req.body;

        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { ...data, userId: req.user._id },
            { new: true, upsert: true}
        );
        res.status(200).json({
            message: 'Profile updated successfully',
            profile,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadResume = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumePath = req.file.path;
        const profile = await StudentProfile.findOneAndUpdate(
            { userId: req.user._id },
            { resumeUrl: resumePath },
            { new: true, upsert: true }
        );
        res.status(200).json({
            message: 'Resume uploaded successfully',
            profile,
            resumeUrl: resumePath,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getProfile, upsertProfile, uploadResume };