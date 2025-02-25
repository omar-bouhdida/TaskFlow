require('dotenv').config({ path: __dirname + '/.env' }); // Corrected path

const mongoose = require('mongoose');

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the .env file.');
    }

    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options

    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  } finally {
    mongoose.connection.close(); // Close the connection after testing
  }
})();