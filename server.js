// Import required modules
const express = require('express'); // Express.js framework for creating APIs
const mongoose = require('mongoose'); // MongoDB object modeling tool
const axios = require('axios'); // HTTP client for making requests
const dotenv = require('dotenv'); // Loads environment variables from a .env file
const Satellite = require('./models/Satellite'); // Import Satellite model
const Launcher = require('./models/Launcher'); // Import Launcher model
const launcherRoutes = require('./routes/LauncherRoutes'); // Import routes for Launcher
const satelliteRoutes = require('./routes/SatelliteRoutes'); // Import routes for Satellite
const MissionRoutes = require('./routes/MissionRoutes'); // Import routes for Mission
const Missions = require('./models/Missions'); // Import Mission model

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();
app.use(express.json()); // Middleware to parse incoming requests as JSON

// Replace this with your MongoDB connection string or import it from dbConnect.js
const dbConnect = 'DB_URI'; // Replace this with your actual MongoDB connection string

// MongoDB connection setup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); // Log successful MongoDB connection
    populateDatabase(); // Call function to populate the database after connection
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error); // Log MongoDB connection error
  });

// Define routes for different resources
app.use('/Launcher', launcherRoutes); // Mount Launcher routes
app.use('/satellites', satelliteRoutes); // Mount Satellite routes
app.use('/missions', MissionRoutes); // Mount Mission routes

// Fetch data from an external API and populate the MongoDB collections
async function populateDatabase() {
  try {
    const apiResponse = await axios.get('https://isro.vercel.app/api/customer_satellites');
    const apiData = apiResponse.data.customer_satellites; // Accessing the correct data structure

    if (Array.isArray(apiData)) {
      // Prepare data for Satellite collection
      const satellitesData = apiData.map((satellite) => ({
        id: satellite.id,
        country: satellite.country,
        launch_date: satellite.launch_date,
        mass: satellite.mass,
        launcher_id: satellite.launcher,
        mission: satellite.mission, // Assuming mission data is present in the API response
      }));

      // Prepare data for Launcher collection
      const launchersData = apiData.map((satellite) => ({
        id: satellite.launcher, // Use satellite ID as launcher ID for reference
        name: satellite.launcher,
        country: satellite.country,
        launch_count: 1, // You might need to adjust this according to your data
      }));

      // Prepare data for Mission collection
      const missionsData = apiData.map((satellite) => ({
        mission_id: satellite.mission_id, // Assuming mission_id is present in the API response
        mission_name: satellite.mission_name,
        mission_description: satellite.mission_String,
        mission_country: satellite.mission_String,
        mission_launch_count: satellite.mission_Number,
        // Assuming mission_name is present in the API response
        // Other mission fields as needed
      }));

      // Populate Satellite collection
      await Satellite.insertMany(satellitesData);

      // Populate Launcher collection
      await Launcher.insertMany(launchersData);

      // Populate Mission collection
      await Missions.insertMany(missionsData);

      console.log('Database populated with fetched data'); // Log successful population
    } else {
      console.error('Data structure is incorrect or missing required fields'); // Log data structure error
    }
  } catch (error) {
    console.error('Error populating database:', error); // Log error while populating database
  }
}

// Define your application's server port
const PORT = process.env.PORT || 3000;

// Start the server to listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // Log server start
});

















































//
// 
// app.use(express.json());

// // Connect to MongoDB and populate the database
// mongoose.connect(process.env.DB_CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     await fetchDataAndPopulateDB();

//     // Start the Express server
//     app.listen(3000, () => {
//       console.log('Node API app is running on port 3000');
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// // Fetch data from an external API and populate the database
// async function fetchDataAndPopulateDB() {
//   try {
//     // Fetch data from the API
//     const apiResponse = await axios.get('https://isro.vercel.app/api/customer_satellites');
//     const apiData = apiResponse.data; // Assuming the response has a 'data' property with the required data

//     // Extract satellites and launchers
//     const satellites = apiData.customer_satellites.map((satellite) => ({
//       id: satellite.id,
//       country: satellite.country,
//       launch_date: satellite.launch_date,
//       mass: satellite.mass,
//       launcher_id: satellite.launcher,
//     }));

//     // Separate launchers to avoid duplication and insert only unique ones
//     const uniqueLaunchers = [...new Set(apiData.customer_satellites.map((satellite) => satellite.launcher))];
//     const launchers = uniqueLaunchers.map((launcherId) => ({ id: launcherId }));

//     // Populate the Satellite collection
//     await Satellite.insertMany(satellites);

//     // Populate the Launcher collection with unique launchers
//     await Launcher.insertMany(launchers);

//     console.log('Database populated with fetched data');
//   } catch (error) {
//     console.error('Error populating database:', error);
//   }
// }

// // Routes for API endpoints (optional)
// app.get('/api/satellites', async (req, res) => {
//   try {
//     // Fetch and return satellite data from your MongoDB collection
//     const satellites = await Satellite.find('https://isro.vercel.app/api/customer_satellites');
//     res.json(satellites);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/api/launchers', async (req, res) => {
//   try {
//     // Fetch and return launcher/mission data from your MongoDB collection
//     const missions = await Launcher.find('https://isro.vercel.app/api/customer_satellites');
//     res.json(missions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = app;
