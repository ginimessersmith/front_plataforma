export interface OneResourceInterface {
  id:          number;
  description: string;
  createdAt:   Date;
  updatedAt:   Date;
  UserId:      number;
  CategoryId:  number;
  Files:       File[];
  User:        User;
}

export interface File {
  id:       number;
  filename: string;
  path_url: string;
}

export interface User {
  id:   number;
  name: string;
}
