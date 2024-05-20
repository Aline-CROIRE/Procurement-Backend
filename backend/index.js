const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const cron = require('node-cron');
const Tender = require('./model/tender/tender.model.js'); 
dotenv.config();

const allRoutes = require("../backend/routers/Auth.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.js");

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: ["http://localhost:3000", "https://procurement-backend-red.onrender.com/", "http://localhost:5173"],
  credentials: true,
};

// Server middlewares
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use("/", allRoutes);

// Database connectivity
mongoose.connect('mongodb+srv://vanessabewe:crazylegs@cluster0.cqvcu4t.mongodb.net/procure')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Function to delete past deadline tenders
const deletePastDeadlineTenders = async () => {
  try {
    const currentDate = new Date();
    // Find and delete all tenders past their deadline
    const result = await Tender.deleteMany({ deadline: { $lt: currentDate } });
    console.log(`Tenders past their deadline deleted successfully. Deleted count: ${result.deletedCount}`);
  } catch (error) {
    console.error('Error deleting past deadline tenders:', error);
  }
};

// Schedule the deletePastDeadlineTenders function to run once every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running deletePastDeadlineTenders function...');
  deletePastDeadlineTenders();
});

// Start the Express.js server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware
// app.use(ErrorHandler);
