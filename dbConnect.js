// Establishes a connection to the MongoDB database using Mongoose, utilizing the DB_URI from the environment variables.
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); // Logs a successful connection to the MongoDB database.
    createIndexes(); // Calls the function to create indexes after successfully connecting to the database.
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error); // Logs an error if there's a problem connecting to the MongoDB database.
  });

// Function to create indexes
async function createIndexes() {
  try {
    // Creates an index on the 'id' field in the 'satellites' collection to optimize queries using the 'id' field.
    await Satellite.collection.createIndex({ "id": 1 });
    console.log('Index created successfully'); // Logs a successful creation of the index.
  } catch (error) {
    console.error('Error creating index:', error); // Logs an error if there's a problem creating the index.
  }
}

