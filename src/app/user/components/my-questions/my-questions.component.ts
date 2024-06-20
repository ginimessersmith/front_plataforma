import { Component, Input } from '@angular/core';
import { FindAllQuestionInterface } from '../../interface/question/findAllQuestion-response';

@Component({
  selector: 'user-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent {

  @Input() allQuestions!:FindAllQuestionInterface[]

}
