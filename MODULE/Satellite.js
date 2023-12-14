// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Satellite entity using mongoose.Schema
const satelliteSchema = new mongoose.Schema({
  // Define fields for the Satellite entity
  id: String, // Field for the identifier of the satellite
  country: String, // Field for the country associated with the satellite
  launch_date: String, // Field for the launch date of the satellite
  mass: String, // Field for the mass of the satellite
  launcher: String // Field for the launcher associated with the satellite
});

// Create a Mongoose model named 'Satellite' based on the 'satelliteSchema'
const Satellite = mongoose.model('Satellite', satelliteSchema);

// Export the 'Satellite' model to be used in other parts of the application
module.exports = Satellite;


