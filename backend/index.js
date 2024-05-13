const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const dotenv = require ("dotenv");
dotenv.config();
//const configurations = require("../backend/connection/database.js");
const allRoutes = require("../backend/routers/Auth.js");
//const ErrorHandler = require("./middlewares/error-handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./docs/swagger.js');
 // Import as object

// Server middlewares
const app = express();
app.use(express.json());
app.use(cors)
// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use("/", allRoutes);

// Database connectivity
mongoose.connect(process.env.MONGODB_CONNECTION_STRING ||'mongodb+srv://niyocroirealine:I3lWKD8AmW27MmyG@cluster0.ufciukm.mongodb.net/Procurement')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT ||8080}`)
);

// Error handling middleware
//app.use(ErrorHandler);
