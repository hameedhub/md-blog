import { Pool, ResultSetHeader } from "mysql2/promise";
import pool from "./index";

export default class Query {
  pool: Pool;
  table: string;

  constructor(table: string) {
    this.pool = pool;
    this.table = table;
  }
  async insert(keys: any[], values: any[]): Promise<number> {
    try {
      const response = await this.pool.query<ResultSetHeader>(
        `INSERT INTO ${this.table} (${keys}) VALUES(${values
          .map((v) => `'${v}'`)
          .join(", ")})`
      );
      return response[0].insertId;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  async select(parameter: any[], constraint: any[]): Promise<any> {
    try {
      const response = await this.pool.query<ResultSetHeader>(
        `SELECT ${parameter} FROM ${this.table} WHERE ${constraint}`
      );
      return response[0];
    } catch (error) {
      return error;
    }
  }
  async query(query: string) {
    try {
      const response = await this.pool.query(`${query}`);
      return response;
    } catch (error) {
      return error;
    }
  }
  async update(values: any[], constraint: any[]): Promise<any> {
    try {
      const response = await this.pool.query<ResultSetHeader>(
        `UPDATE ${this.table} SET ${values} WHERE ${constraint}`
      );
      return response[0];
    } catch (error) {
      return error;
    }
  }
}
