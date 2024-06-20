import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/user/interface/user/user.interface';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{
  public allUser!:UserInterface[]

  constructor(
    private userService:UserService
  ){}

  ngOnInit(): void {
    this.findAllUsers()
  }

  findAllUsers(){
    this.userService.findAllUsers()
    .subscribe({
      next:(res)=>{
        this.allUser = res
      },
      error:(err)=>{
        console.log({err})
      }
    })
  }

}
