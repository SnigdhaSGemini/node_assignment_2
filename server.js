const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
require("dotenv").config();
const path = require('path');
const dbConnect = require('./config/dbConnect');
const app = express();
const bodyParser= require("body-parser")
const inputRouter = require("./routes/inputRoute")
const cors = require('cors')

app.use(bodyParser.json())

const PORT = process.env.PORT || 4000;
dbConnect();


// Set up Multer for file uploads
// const storage = multer.diskStorage({
//   destination: 'public/uploads',
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

// const upload = multer({ storage });
app.use(cors())
// Middleware for JSON parsing
app.use(express.json());

// Middleware for serving static files
app.use(express.static('public'));

app.use('/record',inputRouter)
// API endpoints




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});