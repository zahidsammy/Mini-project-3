// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Launcher entity using mongoose.Schema
const launcherSchema = new mongoose.Schema({
  // Define the 'satellites' field as an array of ObjectIds referencing the 'Satellite' model
  satellites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Satellite' }],
  // Define individual fields for the Launcher entity
  id: String,
  name: String,
  country: String,
  launch_count: Number,
  // Define the 'missions' field as an array of ObjectIds referencing the 'Mission' model
  missions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
});

// Create a Mongoose model named 'Launcher' based on the 'launcherSchema'
const Launcher = mongoose.model('Launcher', launcherSchema);

// Export the 'Launcher' model to be used in other parts of the application
module.exports = Launcher;



