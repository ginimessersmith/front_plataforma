export interface ResourceByUserInterface {
  id:          number;
  description: string;
  createdAt:   Date;
  updatedAt:   Date;
  UserId:      number;
  CategoryId:  number;
  Files:       File[];
}

export interface File {
  id:       number;
  filename: string;
  path_url: string;
}
