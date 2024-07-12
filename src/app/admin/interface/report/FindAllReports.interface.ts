export interface FindAllReportsInterface {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  pageSize:    number;
  data:        Datum[];
}

export interface Datum {
  id:             number;
  reason:         string;
  classification: string;
  modelType:      string;
  status:         string;
  createdAt:      Date;
  updatedAt:      Date;
  QuestionId:     number | null;
  ResponseId:     number | null;
}
