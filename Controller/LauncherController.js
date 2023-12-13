// Import the Launcher model to interact with the Launchers collection in the database
const Launcher = require('../models/Launcher');

// Define an object that contains methods to handle various Launcher-related operations
const launcherController = {
  // Method to retrieve all Launchers along with their associated satellites and missions
  getAllLaunchers: async (req, res) => {
    try {
      // Find all Launchers and populate their 'satellites' and 'missions' fields with associated data
      const launchers = await Launcher.find().populate('satellites').populate('missions');
      // Send the retrieved Launchers as a JSON response
      res.json(launchers);
    } catch (err) {
      // If an error occurs, send a 500 status code with an error message as a JSON response
      res.status(500).json({ message: err.message });
    }
  },

  // Method to create a new Launcher
  createLauncher: async (req, res) => {
    try {
      // Create a new Launcher based on the data received in the request body
      const newLauncher = await Launcher.create(req.body);
      // Send a 201 status code along with the newly created Launcher as a JSON response
      res.status(201).json(newLauncher);
    } catch (err) {
      // If there's an error in creating the Launcher, send a 400 status code with an error message
      res.status(400).json({ message: err.message });
    }
  },

  // Method to increment likes for a specific Launcher identified by ID
  addLikesToLauncher: async (launcherId, likes, res) => {
    try {
      // Fetch the Launcher by its ID from the database
      const launcher = await Launcher.findById(launcherId);
      
      // Increment the 'likes' field of the Launcher by the specified amount
      launcher.likes += likes;

      // Save the updated Launcher to the database
      await launcher.save();
      
      // Send the updated Launcher as a JSON response
      res.json(launcher);
    } catch (err) {
      // If an error occurs during the process, send a 400 status code with an error message
      res.status(400).json({ message: err.message });
    }
  },

  // Method to delete a Launcher based on its ID
  deleteLauncherById: async (launcherId, res) => {
    try {
      // Find and delete the Launcher from the database using its ID
      await Launcher.findByIdAndDelete(launcherId);
      // Send a 204 status code indicating successful deletion (no content)
      res.status(204).end();
    } catch (err) {
      // If there's an error while deleting the Launcher, send a 400 status code with an error message
      res.status(400).json({ message: err.message });
    }
  }
};

// Export the launcherController object to be used in other parts of the application
module.exports = launcherController;


