import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { User } from 'src/app/Model/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-proj',
  templateUrl: './add-proj.component.html',
  styleUrls: ['./add-proj.component.css']
})
export class AddProjComponent implements OnInit {
  SubmitButtonName: string = "Add";
  searchUserText: any;
  date: Date;
  constructor(public projectService: ProjectServiceService, public modalService: NgbModal, public userService: UserServiceService, public datePipe: DatePipe) { }

  ngOnInit() {
  }
  ngAfterContentChecked() {
    if (this.projectService.selectedProject.ProjectID == undefined) {
      this.SubmitButtonName = "Add";
    }
    else {
      this.SubmitButtonName = "Update";
    }
  }

  fixDateRange(e) {
    if (e.target.checked) {
      this.date = new Date();
      this.projectService.selectedProject.StartDate = new Date(this.datePipe.transform(this.date, "yyyy-MM-dd"));
      this.projectService.selectedProject.EndDate = new Date(this.datePipe.transform(this.date.setDate(this.date.getDate() + 1), "yyyy-MM-dd"));
    }
    else {
      this.projectService.selectedProject.StartDate = this.projectService.selectedProject.EndDate = null;
    }
  }


  showUserList() {
    return this.userService.GetAll().subscribe(x => { this.userService.userList = x as User[] });
  }

  retreiveUser(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
    this.projectService.selectedProject.ManagerName = this.userService.selectedUser.FirstName + " " + this.userService.selectedUser.LastName;
    this.projectService.selectedProject.EmployeeID = user.EmployeeID;
    return this.projectService.selectedProject.ManagerName;
  }

  onSubmit(form: NgForm) {
    if (form.value.ProjectID == null) {
      if (form.value.StartDate != undefined && form.value.StartDate
        && form.value.EndDate != undefined && form.value.EndDate) {
        if (form.value.StartDate > form.value.EndDate){
           alert('Project End Date should be greater than Project Start Date');
          }
        else {
          this.saveProj(form);
          form.resetForm();
        }
      }
      else {
        this.saveProj(form);
        form.resetForm();
      }
    }
    else {
      if (form.value.StartDate != undefined && form.value.StartDate
        && form.value.EndDate != undefined && form.value.EndDate) {
        if (form.value.StartDate > form.value.EndDate){
          alert('Project End Date should be greater than Project Start Date');
        }
        else {
          this.updateProj(form);
          form.resetForm();
        }
      }
      else {
        this.updateProj(form);
        form.resetForm();
      }
    }
  }

  saveProj(form: NgForm) {
    console.log("Save Called");
    this.projectService.Add(form.value).subscribe(res=>{
      form.resetForm();
      this.projectService.GetAll().subscribe(k=>this.projectService.projectList=k);
    });
   }
  updateProj(form: NgForm) {
    console.log("Update Called");
    this.projectService.EditProject(form.value).subscribe(res=>{
      form.resetForm();
      this.projectService.GetAll().subscribe(k=>this.projectService.projectList=k);
    });
   }
  
}
