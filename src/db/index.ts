import { createPool, Pool } from "mysql2/promise";
import dbConfig from "../config/db";

const pool: Pool = createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 10,
});

export default pool;
