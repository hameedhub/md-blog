import User from "../models/user.model";
import bcrypt from "bcrypt";
import Query from "../db/query";

const users = new Query("users");

export default class AuthService {
  static async signup(user: User) {
    try {
      const hashPassword = await bcrypt.hash(user.password, 8);

      const result: number = await users.insert(Object.keys(user), [
        user.first_name,
        user.last_name,
        user.email,
        hashPassword,
      ]);

      const newUser = await users.select(["*"], [`id= ${result}`]);
      if (newUser) throw new Error("Failed to retrieve user after signup.");
      return newUser;
    } catch (error: any) {
      throw error.message;
    }
  }
  static async login(email: string, password: string) {
    try {
      const result = await users.select(["*"], [`email='${email}'`]);

      if (result[0].length === 0) throw new Error(`Invalid login credentials`);

      const isValidPassword = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!isValidPassword) throw new Error(`Invalid login credentials`);

      return result[0];
    } catch (error: any) {
      throw error.message;
    }
  }
}
