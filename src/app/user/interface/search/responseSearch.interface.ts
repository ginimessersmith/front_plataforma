export interface ResponseSearchInterface {
  id:        number;
  title:     string;
  content:   string;
  status:    string;
  createdAt: Date;
  updatedAt: Date;
  UserId:    number;
  User:      User;
  Tags:      User;
  Files:     File[];
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

