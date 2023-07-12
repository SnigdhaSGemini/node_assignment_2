const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/dbConnect');
const app = express();
const bodyParser= require("body-parser")
const inputRouter = require("./routes/inputRoute")
const cors = require('cors')
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json())

dbConnect();

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