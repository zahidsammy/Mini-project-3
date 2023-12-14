// Import necessary modules
const express = require('express');
const router = express.Router(); // Create an instance of Express Router
const SatelliteController = require('../controllers/SatelliteController'); // Import the SatelliteController

// Define different routes for Satellite-related operations

// Route to get all satellites
router.get('/', SatelliteController.getAllSatellites);

// Route to create a new satellite
router.post('/', SatelliteController.createSatellite);

// Route to update a satellite by its ID
router.put('/:id', SatelliteController.updateSatellite);

// Route to delete a satellite by its ID
router.delete('/:id', SatelliteController.deleteSatellite);

// Export the router with defined routes to be used in the application
module.exports = router;



