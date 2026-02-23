import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

/**
 * Cached connection interface.
 * - `conn`: the resolved Mongoose instance (null until connected)
 * - `promise`: the in-flight connection promise (null until initiated)
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the Node.js global object so we can persist the connection
 * cache across hot-reloads in development (Next.js re-evaluates
 * modules on every request in dev mode).
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Reuse the cached value or initialise a new one
const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

/**
 * Get a cached Mongoose connection, creating it on first call and reusing it thereafter.
 *
 * @returns The established Mongoose connection instance.
 */
async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
