import { Pool, ResultSetHeader } from "mysql2/promise";
import pool from "./index";

export default class Query {
  pool: Pool;
  table: string;

  constructor(table: string) {
    this.pool = pool;
    this.table = table;
  }
  private buildJoinClause(
    joinTable: string | null,
    joinCondition: string,
    joinType: string
  ): string {
    if (joinTable && joinCondition) {
      return ` ${joinType} JOIN ${joinTable} ON ${joinCondition}`;
    }
    return "";
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
  async select(
    parameter: string[],
    constraint: string[],
    joinTable: string | null = null,
    joinCondition: string = "",
    joinType: string = "LEFT"
  ): Promise<any> {
    try {
      let query = `SELECT ${parameter} FROM ${this.table} `;

      query += this.buildJoinClause(joinTable, joinCondition, joinType);
      query += ` WHERE ${constraint}`;

      const response = await this.pool.query<ResultSetHeader>(query);
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
  async update(
    values: Record<string, any>,
    constraint: string[]
  ): Promise<any> {
    try {
      const response = await this.pool.query<ResultSetHeader>(
        `UPDATE ${this.table} SET ${Object.keys(values)
          .map((key) => `${key} = '${values[key]}'`)
          .join(", ")} WHERE ${constraint}`
      );
      return response[0];
    } catch (error) {
      return error;
    }
  }
  async selectAll(
    parameter: string[] = [`*`],
    orderBy: string = "id",
    orderPattern: string = "DESC",
    limit: number = 10,
    joinTable: string | null = null,
    joinCondition: string = "",
    joinType: string = "LEFT"
  ): Promise<any> {
    try {
      let query = `SELECT ${parameter} FROM ${this.table}`;

      query += this.buildJoinClause(joinTable, joinCondition, joinType);
      query += ` ORDER BY ${orderBy} ${orderPattern} LIMIT ${limit}`;

      const response = await this.pool.query(query);
      return response[0];
    } catch (error) {
      return error;
    }
  }
  async delete(constraint: string[]) : Promise<any>{
    try {
        const response = await this.pool.query(`DELETE FROM ${this.table} WHERE ${constraint}`);
        return response;
    } catch (error) {
        return error;
    }
}
}
