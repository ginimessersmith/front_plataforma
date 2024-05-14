export interface RespondByUserInterface {
  id:          number;
  description: string;
  score:       number;
  url_extern:  string;
  createdAt:   Date;
  updatedAt:   Date;
  UserId:      number;
  QuestionId:  number;
  Question:    Question;
  Files:       File[];
}

export interface File {
  id:       number;
  filename: string;
  path_url: string;
}

export interface Question {
  id:    number;
  title: string;
}
