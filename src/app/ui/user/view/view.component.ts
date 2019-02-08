import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import {UserServiceService} from 'src/app/Services/user-service.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  colValue: string = 'FirstName';
  direction: number;
  isDrctnChnge: boolean = false;
  searchTermText = '';
  
  
  constructor(public userservice:UserServiceService) { 
    
  }

  ngOnInit() {
    this.userservice.GetAll().subscribe(k=>this.userservice.userList=k);
  }

  editUser(user:User)
  {
    this.userservice.Edit(user);
  }

  deleteUser(id:number)
  {
    if(id!=undefined)
    {
      this.userservice.Delete(id).subscribe(res=>{
        this.userservice.GetAll().subscribe(k=>this.userservice.userList=k);
      });
    }
  }

  SortUsers(sortKey:string)
  {
    this.isDrctnChnge = !this.isDrctnChnge; //change the direction    
    this.colValue = sortKey;
    this.direction = this.isDrctnChnge ? 1 : -1;
  }
}
