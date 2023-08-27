import { RowDataPacket } from "mysql2";
import User from "./user.model";

export default interface Post extends RowDataPacket {
  id?: number;
  user_id: number;
  title: string;
  summary: string;
  content: string;
  published?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
