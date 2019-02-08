import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import {Project} from 'src/app/Model/project';

@Component({
  selector: 'app-view-proj',
  templateUrl: './view-proj.component.html',
  styleUrls: ['./view-proj.component.css']
})
export class ViewProjComponent implements OnInit {
  colValue: string = 'ProjectName';
  direction: number;
  isDrctnChnge: boolean = false;
  searchTermText = '';
  constructor(public projService: ProjectServiceService) { }

  ngOnInit() {
    this.projService.GetAll().subscribe(k=>this.projService.projectList=k);
  }

  SortProjects(sortKey:string){
    this.isDrctnChnge = !this.isDrctnChnge; //change the direction    
    this.colValue = sortKey;
    this.direction = this.isDrctnChnge ? 1 : -1;
  }

  editProject(proj:Project)
  {
    this.projService.Edit(proj);
  }

  suspendProject(proj:Project)
  {
    if(proj!=undefined)
    {
      proj.ISActive=false;
      this.projService.EditProject(proj).subscribe(res=>{
        this.projService.GetAll().subscribe(k=>this.projService.projectList=k);
      });
    }
  }

}
