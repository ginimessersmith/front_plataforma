export interface QuestionByTagInterface {
  id:          number;
  title:       string;
  content:     string;
  createdAt:   Date;
  updatedAt:   Date;
  UserId:      number;
  Tags:        Tag[];
  User:        User;
  QuestionTag: QuestionTag;
}

export interface QuestionTag {
  createdAt:  Date;
  updatedAt:  Date;
  QuestionId: number;
  TagId:      number;
}

export interface User {
  id:   number;
  name: string;
}

export interface Tag {
  id:   number;
  name: string;
}
