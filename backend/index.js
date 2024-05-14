const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const configurations = require("../backend/connection/database.js");
const allRoutes = require("../backend/routers/Auth.js");
//const ErrorHandler = require("./middlewares/error-handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.js");
// Import as object

// Server middlewares
const app = express();
app.use(express.json());
app.use(cors);
// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use("/", allRoutes);

// Database connectivity
mongoose
  .connect(configurations.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start server
app.listen(configurations.PORT, () =>
  console.log(`Server is running on port ${configurations.PORT}`)
);

// Error handling middleware
//app.use(ErrorHandler);
