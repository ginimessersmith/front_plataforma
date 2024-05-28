import { Component, Input } from '@angular/core';
import { RespondByUserInterface } from '../../interface/user/respond-by-user.interface';

@Component({
  selector: 'user-my-respond',
  templateUrl: './my-respond.component.html',
  styleUrls: ['./my-respond.component.css']
})
export class MyRespondComponent {
  @Input() responses!: RespondByUserInterface[]
  public panelOpenState = false;
}
