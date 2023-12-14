// Import the necessary modules
const express = require('express');
const router = express.Router(); // Create an instance of Express Router
const LauncherController = require('../controllers/LauncherController'); // Import the LauncherController

// Define different routes for Launcher-related operations

// Route to get all launchers
router.get('/', LauncherController.getAllLaunchers);

// Route to create a new launcher
router.post('/', LauncherController.createLauncher);

// Route to update likes for a launcher by its ID
router.put('/:id/addLikes', LauncherController.addLikesToLauncher);

// Route to delete a launcher by its ID
router.delete('/:id', LauncherController.deleteLauncherById);

// Export the router with defined routes to be used in the application
module.exports = router;

