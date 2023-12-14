// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Mission entity using mongoose.Schema
const missionSchema = new mongoose.Schema({
  // Define fields for the Mission entity
  name: String, // Field for the name of the mission
  description: String, // Field for the description of the mission
  country: String, // Field for the country associated with the mission
  launch_count: Number, // Field for the launch count of the mission
});

// Create a Mongoose model named 'Missions' based on the 'missionSchema'
const Missions = mongoose.model('Mission', missionSchema);

// Export the 'Missions' model to be used in other parts of the application
module.exports = Missions;
