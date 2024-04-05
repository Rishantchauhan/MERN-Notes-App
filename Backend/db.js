const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook";

const ConnectToMongoose = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to mongoose");
    } catch (error) {
        console.error("Error connecting to mongoose:", error.message);
    }
};

module.exports = ConnectToMongoose;
