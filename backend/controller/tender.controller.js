//approval controller const ApplicationForm = require('../model/supplier/supplier.model');
const Tender = require('../model/tender/tender.model')


const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const multer = require('multer');
require('dotenv').config();

// Initialize multer for handling file uploads
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyCNMB4QCOwGBg92tuaoovt4VMLUMYd1okM",
    authDomain:"procurement-d2f10.firebaseapp.com",
    projectId:"procurement-d2f10",
    storageBucket:"procurement-d2f10.appspot.com",
    messagingSenderId: "373799834196",
    appId:"1:373799834196:web:6128f5995c11e7889a53c1",
    measurementId:"G-RZKSR3GJJH"
};
// Initialize Firebase if not already initialized
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storageRef = getStorage(app);
// Utility function to convert date format

const tenders =async (req,res) => {
    try {
        const tender = await Tender.find()
        res.send(tender)
    } catch (error) {
        res.status(404).json({ message: "no tender exist" })
    }
}
const newTender = async (req, res) => {
    const { title, qualification, location, deadline } = req.body;
    
    try {
        // Check if title is present
        if (!title) {
            return res.status(400).json({ error: 'Missing required field: title' });
        }

        let image = null;
        
        if (req.file) {
            try {
                const imageFile = req.file;
                const imageFileName = `${Date.now()}_${imageFile.originalname}`;
                const fileRef = ref(storageRef, imageFileName);

                await uploadBytes(fileRef, imageFile.buffer, { contentType: imageFile.mimetype });
                image = await getDownloadURL(fileRef);
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                return res.status(500).json({ error: 'Image upload failed' });
            }
        }

        const newTenderData = {
            title,
            image,
            qualification,
            location,
            deadline,
        };

        addDoc(collection(db, 'tenders'), newTenderData);
        const application = new Tender(newTenderData);
        await application.save();
        return res.status(201).json({ message: 'Tender form submitted successfully' });
    } catch (error) {
        console.error('Error creating tender:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const updateTender = async (req, res) => {
    
    try {
        const { id } = req.query 
    let{ updateData} = req.body 
  console.log(id)
      const updatedTender = await Tender.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      console.log('Update data:', updateData); // Optional to log the received data
      if (!updatedTender) {
        return res.status(404).json({ message: "Tender not found" });
      }
      return res.status(200).json({ message:'updated successfully' });
    } catch (error) {
      console.error('Error updating tender:', error);
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
    updateTender,
    uploads,
    deletePastDeadlineTenders
}