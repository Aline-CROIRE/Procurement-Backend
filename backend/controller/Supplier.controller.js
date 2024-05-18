const ApplicationForm = require('../model/supplier/supplier.model');

const applicant =async (req,res) => {
    try {
        const candidates = await ApplicationForm.find()
        res.send(candidates)
    } catch (error) {
        res.status(404).json({ message: "no candidate exist" })
    }
}

const FormToFill = async (req, res) => { 
    try {
        // Extract data from the request body
        const { fullName, email, companyName, companyAddress, contactNumber, cv, whyHire } = req.body;

        // Create a new application form object
        const newApplicationForm = new ApplicationForm({
            fullName,
            email,
            companyName,
            companyAddress,
            contactNumber,
            cv,
            whyHire
        });
        await newApplicationForm.save();

        return res.status(201).json({ message: 'Application form submitted successfully' });
    } catch (error) {
        console.error('Error creating application form:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const selectApplication = async (req, res) => {
    try {
        const { id } = req.query; 

        // Find the application form entry by ID
        const application = await ApplicationForm.findById(id);

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Update status to "selected"
        application.status = 'selected';

        // Save the updated application form entry
        await application.save();

        return res.status(200).json({ message: 'Application selected successfully' });
    } catch (error) {
        console.error('Error selecting application:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteRejectedApplications = async (req, res) => {
    try {
        const { id } = req.query; 
        const application = await ApplicationForm.findById(id);

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Update status to "selected"
        application.status = 'rejected';

        // Save the updated application form entry
        await application.save();
        // Find and delete all application form entries with status "rejected"
        await ApplicationForm.deleteMany({ status: 'rejected' });

        return res.status(200).json({ message: 'Rejected applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting rejected applications:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    applicant,
    FormToFill,
    selectApplication,
    deleteRejectedApplications,
}