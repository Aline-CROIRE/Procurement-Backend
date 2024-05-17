const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['supplier'],
        default: 'supplier'
    },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    cv: { type: String }, // Field to store the path or URL of the uploaded CV file
    whyHire: { type: String, required: true }, // Field to capture the response to "Why should we hire you?" question
    status: { type: String,
        enum: ['selected', 'rejected', 'pending'],
        default: 'pending'} // Status of the application (e.g., pending, approved, rejected)
});

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);

module.exports = ApplicationForm;
