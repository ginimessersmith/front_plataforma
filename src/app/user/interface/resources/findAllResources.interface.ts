export interface FindAllResourceInterface {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  pageSize:    number;
  data:        Datum[];
}

export interface Datum {
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
