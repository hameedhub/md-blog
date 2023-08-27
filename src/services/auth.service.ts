import User from "../models/user.model";
import bcrypt from "bcrypt";
import { ResultSetHeader, OkPacket } from "mysql2";
import connect from "../db";
import Query from "../db/query";

const users = new Query("users");

export default class AuthService {
  static async signup(user: User) {
    try {
      
      const hashPassword = await bcrypt.hash(user.password, 8)

      const result: number = await users.insert(Object.keys(user), [
        user.first_name,
        user.last_name,
        user.email,
        hashPassword,
      ]);

      const newUser = await users.select(["*"], [`id= ${result}`]);
      if (newUser) {
        return newUser;
      } else {
        throw new Error("Failed to retrieve user after signup.");
      }
    } catch (error) {
      throw error;
    }
  }
}
