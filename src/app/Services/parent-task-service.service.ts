import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ParentTask } from '../Model/parent-task';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskServiceService {
  selectedParentTask:ParentTask= new ParentTask();
  parentTaskList:ParentTask[]=[];
  url:string="http://localhost/ProjectManagerAPI/api/ParentTask/";
  //url:string="http://localhost:49852/api/ParentTask/";
  constructor(public httpclient:HttpClient) {} 
  
    GetAll():Observable<any>{
      return this.httpclient.get(this.url).pipe(map((res:Response)=>res));
    }
    Get(id: number): Observable<any> {
      return this.httpclient.get(this.url + "/" + id).pipe(map((res: Response) => res));
    }
    Delete(id: number): Observable<any> {
      console.log("Delete Called");
      return this.httpclient.delete(this.url + "/" + id).pipe(map((res: Response) => res));
    }
    Add(item: ParentTask): Observable<any> {
      console.log(item);
      return this.httpclient.post(this.url, item);
    }
    Edit(item: ParentTask): Observable<any> {
      this.selectedParentTask=item;
      return this.httpclient.get(this.url).pipe(map((res: Response) => res));
    }
    EditParentTask(item: ParentTask): Observable<any> {
      console.log(item);
      return this.httpclient.put(this.url + "/" + item.ParentTaskID, item);
    }
  
}
