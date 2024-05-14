export interface CreateRespondInterface {
  description: string;
  url_extern?: string;
  questionId: number;
  userId: number;
  files?:File;
}
