// Import the Satellite model to interact with the Satellites collection in the database
const Satellite = require('../models/Satellite');

// Define an object that contains methods to handle various Satellite-related operations
const satelliteController = {
  // Method to retrieve all Satellites
  getAllSatellites: async (req, res) => {
    try {
      // Find all Satellites in the database
      const satellites = await Satellite.find();
      // Send the retrieved Satellites as a JSON response
      res.json(satellites);
    } catch (err) {
      // If an error occurs, send a 500 status code with an error message as a JSON response
      res.status(500).json({ message: err.message });
    }
  },

  // Method to create a new Satellite
  createSatellite: async (req, res) => {
    try {
      // Create a new Satellite based on the data received in the request body
      const newSatellite = await Satellite.create(req.body);
      // Send a 201 status code along with the newly created Satellite as a JSON response
      res.status(201).json(newSatellite);
    } catch (err) {
      // If there's an error in creating the Satellite, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  },

  // Method to update a Satellite by its ID
  updateSatellite: async (req, res) => {
    try {
      // Find and update the Satellite by its ID with the data provided in the request body
      const updatedSatellite = await Satellite.findByIdAndUpdate(req.params.id, req.body, { new: true });
      // Send the updated Satellite as a JSON response
      res.json(updatedSatellite);
    } catch (err) {
      // If an error occurs during the update, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  },

  // Method to delete a Satellite by its ID
  deleteSatellite: async (req, res) => {
    try {
      // Find and delete the Satellite from the database using its ID
      await Satellite.findByIdAndDelete(req.params.id);
      // Send a 204 status code indicating successful deletion (no content)
      res.status(204).end();
    } catch (err) {
      // If there's an error while deleting the Satellite, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  }
};

// Export the satelliteController object to be used in other parts of the application
module.exports = satelliteController;


