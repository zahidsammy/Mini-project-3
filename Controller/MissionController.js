// Import the Mission model to interact with the Missions collection in the database
const Mission = require('../models/Missions');

// Define an object that contains methods to handle various Mission-related operations
const missionController = {
  // Method to retrieve all Missions
  getAllMissions: async (req, res) => {
    try {
      // Find all Missions in the database
      const missions = await Mission.find();
      // Send the retrieved Missions as a JSON response
      res.json(missions);
    } catch (err) {
      // If an error occurs, send a 500 status code with an error message as a JSON response
      res.status(500).json({ message: err.message });
    }
  },

  // Method to retrieve a Mission by its ID
  getMissionById: async (req, res) => {
    try {
      // Find a Mission by its ID from the database
      const mission = await Mission.findById(req.params.id);
      // Check if the Mission exists; if not, send a 404 status code with a 'Mission not found' message
      if (!mission) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      // Send the retrieved Mission as a JSON response
      res.json(mission);
    } catch (err) {
      // If an error occurs, send a 500 status code with an error message as a JSON response
      res.status(500).json({ message: err.message });
    }
  },

  // Method to create a new Mission
  createMission: async (req, res) => {
    try {
      // Create a new Mission based on the data received in the request body
      const newMission = await Mission.create(req.body);
      // Send a 201 status code along with the newly created Mission as a JSON response
      res.status(201).json(newMission);
    } catch (err) {
      // If there's an error in creating the Mission, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  },

  // Method to update a Mission by its ID
  updateMission: async (req, res) => {
    try {
      // Find and update the Mission by its ID with the data provided in the request body
      const updatedMission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
      // Send the updated Mission as a JSON response
      res.json(updatedMission);
    } catch (err) {
      // If an error occurs during the update, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  },

  // Method to delete a Mission by its ID
  deleteMission: async (req, res) => {
    try {
      // Find and delete the Mission from the database using its ID
      await Mission.findByIdAndDelete(req.params.id);
      // Send a 204 status code indicating successful deletion (no content)
      res.status(204).end();
    } catch (err) {
      // If there's an error while deleting the Mission, send a 500 status code with an error message
      res.status(500).json({ message: err.message });
    }
  },
};

// Export the missionController object to be used in other parts of the application
module.exports = missionController;
