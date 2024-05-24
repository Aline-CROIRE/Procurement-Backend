const ApplicationForm = require('../model/supplier/supplier.model');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
require('dotenv').config();

// Initialize multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storageRef = getStorage(app);

// Fetch all applicants
const getApplicants = async (req, res) => {
    try {

const candidates = await ApplicationForm.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch candidates" });
    }
};

// Handle form submission
const submitForm = async (req, res) => {
    try {
        const { fullName, email, companyName, companyAddress, contactNumber, whyHire } = req.body;
        
        let cv = null;
        if (req.file) {
            const cvFile = req.file;
            const cvFileName = `${Date.now()}_${cvFile.originalname}`;
            const fileRef = ref(storageRef, cvFileName);
            
            await uploadBytes(fileRef, cvFile.buffer, { contentType: cvFile.mimetype });
            
            cv = await getDownloadURL(fileRef);
        }

        const newApplicationForm = {
            fullName,
            email,
            companyName,
            companyAddress,
            contactNumber,
            cv,
            whyHire,
        };

        addDoc(collection(db, 'applicants'), newApplicationForm);
        const application = new ApplicationForm(newApplicationForm);
        await application.save();


        return res.status(201).json({ message: 'Application form submitted successfully' });
    } catch (error) {
        console.error('Error creating application form:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Select an application
const selectApplication = async (req, res) => {
    try {
        const { id } = req.params;
        
        const applicationRef = doc(db, 'applicants', id);
        const applicationDoc = await getDocs(applicationRef);
        
        if (!applicationDoc.exists()) {
            return res.status(404).json({ error: 'Application not found' });
        }

        await updateDoc(applicationRef, { status: 'selected' });

        return res.status(200).json({ message: 'Application selected successfully' });
    } catch (error) {
        console.error('Error selecting application:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete rejected applications
const deleteRejectedApplications = async (req, res) => {
    try {
        const rejectedQuery = query(collection(db, 'applicants'), where('status', '==', 'rejected'));
        const rejectedSnapshot = await getDocs(rejectedQuery);

        const deletePromises = rejectedSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        return res.status(200).json({ message: 'Rejected applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting rejected applications:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getApplicants,
    submitForm,
    selectApplication,
    deleteRejectedApplications,
    upload
};
