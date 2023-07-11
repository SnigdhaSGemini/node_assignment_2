const mongoose = require('mongoose'); 

// Create a input schema and model using Mongoose
// Declare the Schema of the Mongo model
var inputSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{ 
        type:String,
        required:true,
    },
    category:{
         type:String,
        required:true,
    },
    profilePicture: {
        type:String,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('Input', inputSchema);