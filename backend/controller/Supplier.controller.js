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
        const { fullName, email, password, companyName, companyAddress, contactNumber, cv, whyHire } = req.body;

        // Create a new application form object
        const newApplicationForm = new ApplicationForm({
            fullName,
            email,
            password,
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

module.exports = {
    applicant,
    FormToFill
}