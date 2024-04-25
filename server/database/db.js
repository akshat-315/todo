const mongoose = require('mongoose');

//Makes the connection with the mongodb database.
//If you have cloned the repo, you must provide your own mongodb url in a .env file

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
