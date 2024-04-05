const mongoose = require('mongoose');
const mongooseURI = "mongodb+srv://Notebook:notebook@database.pdvggyn.mongodb.net/b.net/notebook";

const ConnectToMongoose = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to mongoose");
    } catch (error) {
        console.error("Error connecting to mongoose:", error.message);
    }
};

module.exports = ConnectToMongoose;
