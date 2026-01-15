const Application = require('../models/Applications');
const Job = require('../models/Job');

const applyJob = async (req, res) => {
    try {
        const {jobId} = req.body;
        const job = await Job.findById(jobId);

        if(!job || job.status !== 'open') {
            return res.status(400).json({message: 'Job not available'});
        }

        const application = await Application.create({
            studentId: req.user._id,
            jobId,
        });
        res.status(201).json({
            message: 'Applied successfully', 
            application
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: 'You have already applied for this job'});
        }
        res.status(500).json({message: error.message});
    }
};

const getMyApplications = async (req, res) => {
    try{
        const apps= await Application.find({
            studentId: req.user._id,
        }).populate('jobId', 'title location status');
        res.json(apps);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getJobApplications = async (req, res) => {
    try{
        const apps = await Application.find({
            jobId: req.params.jobId,
        }).populate('studentId', 'name email').populate('jobId', 'title');

        res.json(apps);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateApplicationStatus = async (req, res) => {
    try{
        const {status} = req.body;

        const app = await Application.findByIdAndUpdate(
            req.params.applicationId,
            {status},
            {new: true}
        );

        if(!app) {
            return res.status(404).json({message: 'Application not found'});
        }
        res.json({
            message: 'Application status updated',
            app
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { applyJob, getMyApplications, getJobApplications, updateApplicationStatus };
