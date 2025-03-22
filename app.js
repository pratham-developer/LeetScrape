const express = require("express");
const cors = require("cors"); // Import CORS
const morgan = require("morgan");
const leetCodeRoutes = require("./routes");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(morgan("dev"));

// Use routes from routes.js
app.use("/", leetCodeRoutes);

module.exports = app; // Export for Vercel

