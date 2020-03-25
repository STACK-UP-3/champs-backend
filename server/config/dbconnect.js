import { Pool } from 'pg';
import { config } from "dotenv";

config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
if (pool.connect()) {
    console.log("DB connected")
} else {
    console.log("failed to connect")
}
export default pool;
