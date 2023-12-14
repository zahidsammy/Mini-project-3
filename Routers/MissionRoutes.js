// Import the necessary modules
const express = require('express');
const router = express.Router(); // Create an instance of Express Router
const missionController = require('../controllers/MissionController'); // Import the MissionController

// Define different routes for Mission-related operations

// Route to get all missions
router.get('/', missionController.getAllMissions);

// Route to get a mission by its ID
router.get('/:id', missionController.getMissionById);

// Route to create a new mission
router.post('/', missionController.createMission);

// Route to update a mission by its ID
router.put('/:id', missionController.updateMission);

// Route to delete a mission by its ID
router.delete('/:id', missionController.deleteMission);

// Export the router with defined routes to be used in the application
module.exports = router;
