import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import { DatabaseConfig } from '../config/db';

let pool: Pool | null = null;

export async function createDbPool(config: DatabaseConfig): Promise<Pool> {
    if (!pool) {
        pool = mysql.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            connectionLimit: 10
        });
    }
    return pool;
}

export async function getDbConnection(config: DatabaseConfig): Promise<PoolConnection> {
    const dbPool = await createDbPool(config);
    const connection = await dbPool.getConnection();
    return connection;
}
