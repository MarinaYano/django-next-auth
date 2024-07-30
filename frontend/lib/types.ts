import { UserType } from "./nextauth";

export interface PostType {
  uid: string;
  user: UserType;
  image: string | undefined;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}