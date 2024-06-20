export interface ReportDetailsInterface {
  id:             number;
  reason:         string;
  classification: string;
  modelType:      string;
  status:         string;
  createdAt:      Date;
  updatedAt:      Date;
  QuestionId:     number | null;
  ResponseId:     number | null;
  Question:       Question | null;
  Response:       Response | null;
}

export interface Question {
  id:      number;
  title:   string;
  content: string;
}

export interface Response {
  id:          number;
  description: string;
}
