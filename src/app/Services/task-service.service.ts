import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Task } from 'src/app/Model/task';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  public selectedTask: Task = new Task();
  url: string = "http://localhost/ProjectManagerAPI/api/task/";
  //url:string="http://localhost:49852/api/task/";
  taskList:Task[]=[];
  constructor(public httpclient:HttpClient) { }
  GetAll(): Observable<any> {
    return this.httpclient.get(this.url);
  }
  Get(id: number): Observable<any> {
    return this.httpclient.get(this.url + "/" + id).pipe(map((res: Response) => res));
  }
  Delete(id: number): Observable<any> {
    console.log("Delete Called");
    return this.httpclient.delete(this.url + "/" + id).pipe(map((res: Response) => res));
  }
  Add(item: Task): Observable<any> {
    console.log(item);
    item.ISActive=true;
    return this.httpclient.post(this.url, item);
  }
  Edit(item: Task): Observable<any> {
    console.log(item);
    this.selectedTask=item;
    return this.httpclient.get(this.url).pipe(map((res: Response) => res));
  }
  EditTask(item: Task): Observable<any> {
    console.log(item);
    this.selectedTask=item;
    return this.httpclient.put(this.url + "/" + item.TaskID, item);
  }
}
