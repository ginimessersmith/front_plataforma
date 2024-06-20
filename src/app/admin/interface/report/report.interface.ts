export interface ReportInterface {
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
