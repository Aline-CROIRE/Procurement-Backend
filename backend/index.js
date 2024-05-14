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

 const corsOptions ={
  allowedHeaders:["Authorization","Content-Type"],
  methods:["GET","POST","PUT","DELETE"],
  orgin:["http://localhost:8080","https://procurement-backend-7jun.onrender.com","http://localhost:5173"],
 Credentials: true,
 }
// Server middlewares
const app = express();
app.use(express.json());
app.use(cors(corsOptions))
// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use("/", allRoutes);

// Database connectivity
mongoose.connect(process.env.MONGODB_CONNECTION_STRING ||'mongodb://atlas-sql-6641bd6ca227095d5654b611-ssbeb.a.query.mongodb.net/Procurement?ssl=true&authSource=admin')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT ||8080}`)
);

// Error handling middleware
//app.use(ErrorHandler);
