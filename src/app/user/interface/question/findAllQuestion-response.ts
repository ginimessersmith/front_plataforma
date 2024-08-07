export interface FindAllQuestionInterface {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  pageSize:    number;
  data:        Datum[];
}

export interface Datum {
  id:        number;
  title:     string;
  content:   string;
  status:    string;
  createdAt: Date;
  updatedAt: Date;
  UserId:    number;
  Tags:      User[];
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
