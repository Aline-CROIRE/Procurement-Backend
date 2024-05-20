//approval controller const ApplicationForm = require('../model/supplier/supplier.model');
const Tender = require('../model/tender/tender.model')

// Utility function to convert date format
const convertDateFormat = (dateString) => {

    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    return date.toISOString();
};

const tenders =async (req,res) => {
    try {
        const tender = await Tender.find()
        res.send(tender)
    } catch (error) {
        res.status(404).json({ message: "no tender exist" })
    }
}

const newTender = async (req, res) => {
    try {
        // Extract data from the request body
        const { title, image, qualification, location, deadline } = req.body;

        // Convert deadline to ISO 8601 format
        const convertedDeadline = convertDateFormat(deadline);

        // Create a new tender object
        const newTender = new Tender({
            title: title,
            image: image,
            qualification: qualification,
            location: location,
            deadline: convertedDeadline // Use the converted deadline
        });

        // Save the new tender to the database
        await newTender.save();

        return res.status(201).json({ message: 'Tender form submitted successfully' });
    } catch (error) {
        console.error('Error creating tender:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const selectTender = async (req, res) => {
    try {
        const { id } = req.query; 

        // Find the application form entry by ID
        const tender = await Tender.findById(id);

        if (!tender) {
            return res.status(404).json({ error: 'Tender not found' });
        }

        // Update status to "selected"
        tender.status = 'Approved';

        // Save the updated application form entry
        await tender.save();

        return res.status(200).json({ message: 'Tender selected successfully' });
    } catch (error) {
        console.error('Error selecting Tender:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const rejectTender = async (req, res) => {
    try {
        const { id } = req.query;
        const tender = await Tender.findById(id);

        if (!tender) {
            return res.status(404).json({ error: 'Tender not found' });
        }

        // Update status to "rejected"
        tender.status = 'Rejected';

        // Save the updated tender
        await tender.save();

        return res.status(200).json({ message: 'Tender status updated to rejected' });
    } catch (error) {
        console.error('Error rejecting tender:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const deletePastDeadlineTenders = async (req, res) => {
    try {
        const currentDate = new Date();

        // Find and delete all tenders past their deadline
        const result = await Tender.deleteMany({ deadline: { $lt: currentDate } });

        return res.status(200).json({ message: 'Tenders past their deadline deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting past deadline tenders:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    tenders,
    newTender,
    selectTender,
    rejectTender,
    deletePastDeadlineTenders
}