import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

const dbConfig: DatabaseConfig = {
    host: process.env.HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "blog"
};

export default dbConfig;
