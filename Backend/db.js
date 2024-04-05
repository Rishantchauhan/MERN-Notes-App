const mongoose = require('mongoose');
const mongooseURI = "mongodb+srv://Notebook:naotbook@database.pdvggyn.mongodb.net/notebook?retryWrites=true&w=majority&appName=Database";

const ConnectToMongoose = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to mongoose");
    } catch (error) {
        console.error("Error connecting to mongoose:", error.message);
    }
};

module.exports = ConnectToMongoose;
