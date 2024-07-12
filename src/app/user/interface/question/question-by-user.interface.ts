export interface QuestionByUserInterface {
  id:        number;
  title:     string;
  content:   string;
  status:    string;
  createdAt: Date;
  updatedAt: Date;
  UserId:    number;
  Tags:      Tag[];
  Files:     File[];
}

export interface File {
  id:       number;
  filename: string;
  path_url: string;
}

export interface Tag {
  id:   number;
  name: string;
}
