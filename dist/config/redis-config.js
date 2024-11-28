import { createClient } from "redis";
import "dotenv/config";
export const clientRedis = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
//192.168.0.102
//192.168.0.108
