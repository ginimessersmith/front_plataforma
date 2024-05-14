export interface FindAllQuestionInterface {
  id:        number;
  title:     string;
  content:   string;
  createdAt: Date;
  updatedAt: Date;
  UserId:    number;
  Tags:      Tag[];
  User:      User;
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

export interface Tag {
  id:   number;
  name: string;
}
