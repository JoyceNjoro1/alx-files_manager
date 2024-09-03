// utils/redis.js

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    this.client.connect().catch((err) => {
      console.error('Redis Connection Error', err);
    });
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(`Error retrieving key ${key} from Redis`, err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration,
      });
    } catch (err) {
      console.error(`Error setting key ${key} in Redis`, err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key} from Redis`, err);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

