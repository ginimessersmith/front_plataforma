export interface FindOneQuestionInterface {
  question:  Question;
  responses: Response[];
}

export interface Question {
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

export interface User {
  id:   number;
  name: string;
}

export interface Tag {
  id:   number;
  name: string;
}

export interface Response {
  id:          number;
  description: string;
  score:       number;
  url_extern:  string;
  createdAt:   Date;
  updatedAt:   Date;
  UserId:      number;
  QuestionId:  number;
  User:        User;
  Files:       File[];
}

export interface File {
  id:       number;
  filename: string;
  path_url: string;
}
