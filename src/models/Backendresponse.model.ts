export interface BackendResponse {
  token: string;
  user: User;
}

export interface User {
  username: string;
  password: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
