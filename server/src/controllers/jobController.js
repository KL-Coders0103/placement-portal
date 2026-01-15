const Job = require('../models/Job');

const createJob = async (req,res) => {
    try {
        const job = await Job.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.status(201).json({
            message: 'Job created successfully',
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const getJobs = async (req,res) => {
    try {
        let filter = {};
        if(req.user.role === "student") {
            filter.status = "open";
        }
        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const getJobsById = async (req,res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if(!job) {
            return res.status(404).json({ message: 'Job not found' }); 
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = { createJob, getJobs, getJobsById };