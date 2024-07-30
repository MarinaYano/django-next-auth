export interface UserType {
  accessToken: string;
  uid: string;
  name: string;
  email: string;
  avatar: string | undefined;
  introduction: string;
}

export interface PostType {
  uid: string;
  user: UserType;
  image: string | undefined;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}