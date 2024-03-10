const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;

    // Create a MongoDB client
    this.client = new MongoClient(`mongodb://${host}:${port}`, { useNewUrlParser: true, useUnifiedTopology: true });
    // mongodb://localhost:vule:virus13sting27017
  }

  async isAlive() {
    try {
      // Connect to MongoDB
      await this.client.connect();
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  }

  async nbUsers() {
    try {
      // Connect to MongoDB
      await this.client.connect();

      // Get the users collection
      const db = this.client.db();
      const usersCollection = db.collection('users');

      // Count the number of documents in the users collection
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return -1;
    }
  }

  async nbFiles() {
    try {
      // Connect to MongoDB
      await this.client.connect();

      // Get the files collection
      const db = this.client.db();
      const filesCollection = db.collection('files');

      // Count the number of documents in the files collection
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return -1;
    }
  }
}

// Create and export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;
