const express = require("express");
const mongoose = require("mongoose");

const cors=require('cors')
const dotenv = require ("dotenv");
dotenv.config();
//const configurations = require("../backend/connection/database.js");
const allRoutes = require("../backend/routers/Auth.js");
//const ErrorHandler = require("./middlewares/error-handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.js");
// Import as object

 const corsOptions ={
  allowedHeaders:["Authorization","Content-Type"],
  methods:["GET","POST","PUT","DELETE"],
  orgin:["http://localhost:3000","https://procurement-backend-7jun.onrender.com","http://localhost:5173"],
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

mongoose.connect(process.env.MONGODB_CONNECTION_STRING||'mongodb+srv://vanessabewe:crazylegs@cluster0.cqvcu4t.mongodb.net/procure')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// ... REST of your Express.js code ...

// Start the Express.js server
const port =process.env.PORT||3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware
//app.use(ErrorHandler);
