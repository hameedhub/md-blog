import { RowDataPacket } from "mysql2";

export default interface User extends RowDataPacket {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  last_login?: string;
  created_at?: Date;
  updated_at?: Date;
}
