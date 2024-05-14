export interface CreateQuestionInterface {
  title:   string;
  content: string;
  idUser:  number;
  tags:    string[];
  files?:File
}
