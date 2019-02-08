import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Project } from 'src/app/Model/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  public selectedProject:Project=new Project();
  projectList:Project[]=[];
  url:string="http://localhost/ProjectManagerAPI/api/Project/";
  //url:string="http://localhost:49852/api/Project/";
  constructor(public httpclient:HttpClient) { }
  GetAll():Observable<any>
   {
     return this.httpclient.get(this.url);
   }
   Get(id:number):Observable<any>
   {
     return this.httpclient.get(this.url+"/"+id).pipe(map((res:Response)=>res));
   }
   Delete(id:number):Observable<any>
   {
    console.log("Delete Called");
     return this.httpclient.delete(this.url+"/"+id).pipe(map((res:Response)=>res));
   }
   Add(item:Project):Observable<any>
   {
     console.log(item);
     item.ISActive=true;
     return this.httpclient.post(this.url,item);
   }
   Edit(item:Project):Observable<any>
   {
    this.selectedProject=item;
    return this.httpclient.get(this.url).pipe(map((res:Response)=>res));
   }
   EditProject(item:Project):Observable<any>
   {
      console.log(item);
      return this.httpclient.put(this.url+"/"+item.ProjectID,item);
   }
}
