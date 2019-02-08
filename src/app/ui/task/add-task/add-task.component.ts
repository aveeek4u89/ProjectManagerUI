import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { DatePipe } from '@angular/common';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { ParentTaskServiceService } from 'src/app/Services/parent-task-service.service';
import { TaskServiceService } from 'src/app/Services/task-service.service';
import { User } from 'src/app/Model/user';
import { Project } from 'src/app/Model/project';
import { NgForm } from '@angular/forms';
import { ParentTask } from 'src/app/Model/parent-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  SubmitButtonName: string = "Add";
  searchUserText: any;
  searchProjectText:any;
  searchParentTaskText:any;
  date: Date;
  isParentTask: boolean = false;
  projectID:number=0;
  constructor(public projectService: ProjectServiceService, public modalService: NgbModal,
    public userService: UserServiceService, public datePipe: DatePipe, public taskService: TaskServiceService, public parentTaskService: ParentTaskServiceService) { }

  ngOnInit() {
    this.setDefaultDate();
    
  }
  ngAfterContentChecked() {
    if (this.taskService.selectedTask.TaskID == undefined) {
      this.SubmitButtonName = "Add";
    }
    else {
      this.projectID = this.taskService.selectedTask.ProjectID;
      this.SubmitButtonName = "Update";
    }
  }

  showProjectList() {
    this.projectService.GetAll().subscribe(x => { this.projectService.projectList = x as Project[] });
  }

  showParentTaskList() {
    this.parentTaskService.GetAll().subscribe(y => { this.parentTaskService.parentTaskList = y as ParentTask[] });
  }

  showUserList() {
    this.userService.GetAll().subscribe(x => { this.userService.userList = x as User[] });
  }

  setParentTask(e) {
    if (e.target.checked) {
      this.isParentTask = true;
      this.taskService.selectedTask.StartDate = this.taskService.selectedTask.EndDate = null;
    }
    else {
      this.isParentTask = false;
      this.setDefaultDate();
    }
  }


  retreiveUser(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
    this.taskService.selectedTask.UserName = this.userService.selectedUser.FirstName + " " + this.userService.selectedUser.LastName;
    this.taskService.selectedTask.UserID = user.EmployeeID;
    return this.taskService.selectedTask.UserName;
  }


  retreiveProject(project: Project) {
    this.projectService.selectedProject = Object.assign({}, project);
    this.taskService.selectedTask.ProjectID = project.ProjectID;
    this.taskService.selectedTask.ProjectName = project.ProjectName;
    return this.taskService.selectedTask.ProjectName;
  }

  retreiveParentTask(pTask: ParentTask) {
    this.parentTaskService.selectedParentTask = Object.assign({}, pTask);
    this.taskService.selectedTask.ParentTaskID = pTask.ParentTaskID;
    this.taskService.selectedTask.ParentTaskName = pTask.ParentTaskName;
    return this.taskService.selectedTask.ParentTaskName;
  }

  setDefaultDate() {
    this.date = new Date();
    this.taskService.selectedTask.StartDate = new Date(this.datePipe.transform(this.date, "yyyy-MM-dd"));
    this.taskService.selectedTask.EndDate = new Date(this.datePipe.transform(this.date.setDate(this.date.getDate() + 1), "yyyy-MM-dd"));
  }

  onSubmit(form: NgForm) {
    if (this.isParentTask) {
      //Save parent task
      console.log("Parent Task Save called");
      this.parentTaskService.Add(form.value).subscribe(res => {
        form.resetForm();
      });
    }
    else if (this.taskService.selectedTask.TaskID == null) {
      //Save Task here
      console.log("Task Save called");
      this.taskService.Add(form.value).subscribe(res => {
        form.resetForm();
      });
    }
    else{
      //Update Task Here
      console.log("Task Update called");
      this.taskService.EditTask(form.value).subscribe(res => {
        form.resetForm();
        this.taskService.Get(this.projectID).subscribe(k=>this.taskService.taskList=k);
      });
    }

  }

}
