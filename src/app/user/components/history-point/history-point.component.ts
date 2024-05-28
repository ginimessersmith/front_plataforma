import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AllPointsByUserInterface } from '../../interface/points/all-points-by-user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'user-history-point',
  templateUrl: './history-point.component.html',
  styleUrls: ['./history-point.component.css']
})
export class HistoryPointComponent {

  @Input() AllPointsByUser!: AllPointsByUserInterface[]
  displayedColumns: string[] = ['action','points','createdAt','updatedAt'];
  // dataSource: MatTableDataSource<AllPointsByUserInterface[]>;

  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(){
  //   this.dataSource = new MatTableDataSource(this.AllPointsByUser);
  // }

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  // }

  // // ngOnChanges(changes: SimpleChanges): void {
  // //   if (changes.AllPointsByUser) {
  // //     this.dataSource.data = this.AllPointsByUser;
  // //   }
  // // }

}
