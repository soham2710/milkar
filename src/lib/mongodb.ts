import { MongoClient } from "mongodb";

// Use your MongoDB Atlas connection string
// In production, this should be set in environment variables for security
const uri = process.env.MONGODB_URI || "mongodb+srv://sohamnsharma:rdcv4c75@cluster0.lwlb7wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  // Additional options can be added here if needed
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
// By doing this in a separate module, the client can be shared across functions
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("milkar"); // Specify the database name
  return { db, client };
}