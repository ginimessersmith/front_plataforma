import { Component, Input } from '@angular/core';
import { ResourceByUserInterface } from '../../interface/resources/resource-by-user.interface';

@Component({
  selector: 'user-my-resources',
  templateUrl: './my-resources.component.html',
  styleUrls: ['./my-resources.component.css']
})
export class MyResourcesComponent {

  @Input() resourceByUser!: ResourceByUserInterface[]
}
