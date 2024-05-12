export interface FindAllQuestionInterface {
  id:        number;
  title:     string;
  content:   string;
  createdAt: Date;
  updatedAt: Date;
  UserId:    number;
  Tags:      Tag[];
  User:      User;
}

export interface User {
  id:   number;
  name: string;
}
export interface Tag {
  id:   number;
  name: string;
}
