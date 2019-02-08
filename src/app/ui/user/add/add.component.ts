import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { FormGroup } from '@angular/forms/src/model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {UserServiceService} from 'src/app/Services/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  SubmitButtonName:string="Add";
  constructor(public user:UserServiceService, public router:Router) { }
  
  ngOnInit() {
    
  }

  ngAfterContentChecked(){
    if(this.user.selectedUser.UserID==undefined)
    {
      this.SubmitButtonName = "Add";
    }
    else
    {
      this.SubmitButtonName = "Update";
    }
  }

  onSubmit(form?:NgForm){
    if(this.user.selectedUser.UserID==undefined)
    {
      this.user.Add(form.value).subscribe(res=>{
        form.resetForm();
        this.user.GetAll().subscribe(k=>this.user.userList=k);
      });
    }
    else
    {
      this.user.EditUser(form.value).subscribe(res=>{
        form.resetForm();
        this.user.GetAll().subscribe(k=>this.user.userList=k);
      });
    }
  }
}
