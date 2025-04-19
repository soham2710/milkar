import { MongoClient, Db } from "mongodb";

// MongoDB connection URI from environment variable or fallback to default
const uri = process.env.MONGODB_URI || "mongodb+srv://sohamnsharma:rdcv4c75@cluster0.lwlb7wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Options for MongoDB connection (could be expanded later)
const options = {};

// A Singleton pattern to ensure only one instance of MongoClient is used
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Connect to MongoDB
const connectToDatabase = async (): Promise<{ db: Db; client: MongoClient }> => {
  if (client) {
    // If client is already connected, return it
    return { db: client.db("milkar"), client };
  }

  if (!clientPromise) {
    // Create a new client and store the promise of connecting to MongoDB
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  // Wait for the client connection to be established
  client = await clientPromise;
  const db = client.db("milkar");

  // Return the db and client instance
  return { db, client };
};

export { connectToDatabase };
export type { Db, MongoClient };