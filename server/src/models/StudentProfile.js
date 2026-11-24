const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },

        education: {
            college: String,
            degree: String,
            branch: String,
            graduationYear: Number,
            cgpa: Number,
        },

        skills: {
            type: [String],
            default: [],
        },

        experience: {
            type: String,
            default: '',
        },

        projects: {
            type: String,
            default: '',
        },

        resumeUrl: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('StudentProfile', studentProfileSchema);