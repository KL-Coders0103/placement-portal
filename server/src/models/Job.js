const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requiredSkills: {
        type: [String],
        default: [],
    },
    minExperience: {
        type: Number,
        default: 0,

    },
    eligibilityCriteria: {
        cgpa: Number,
        branch: [String],
        graduationYear: Number,
    },
    location: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);