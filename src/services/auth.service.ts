import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import Query from "../db/query";

const users = new Query("users");

dotenv.config();

const jwtSecret: string = process.env.JWTSECRET ?? "secret";

export default class AuthService {
  static async signup(user: User) {
    const hashPassword = await bcrypt.hash(user.password, 8);

    const result: number = await users.insert(Object.keys(user), [
      user.first_name,
      user.last_name,
      user.email,
      hashPassword,
    ]);

    const newUser = await users.select(["*"], [`id= ${result}`]);

    if (!newUser[0]) throw new Error("Failed to retrieve user after signup.");

    const token = jwt.sign({ id: result }, jwtSecret);

    return { token, ...newUser[0] };
  }
  static async login(email: string, password: string) {
    const result = await users.select(["*"], [`email='${email}'`]);

    if (result[0].length === 0) throw new Error(`Invalid login credentials`);

    const isValidPassword = await bcrypt.compare(password, result[0].password);

    if (!isValidPassword) throw new Error(`Invalid login credentials`);

    const token = jwt.sign({ id: result[0].id }, jwtSecret);

    return { token, ...result[0] };
  }
}
