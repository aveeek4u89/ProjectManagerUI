import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/Model/user';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public selectedUser: User = new User();
  url: string = "http://localhost/ProjectManagerAPI/api/User/";
  //url:string="http://localhost:49852/api/task";
  userList:User[]=[];
  constructor(public httpclient: HttpClient) { }
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
  Add(item: User): Observable<any> {
    console.log(item);
    return this.httpclient.post(this.url, item);
  }
  Edit(item: User): Observable<any> {
    this.selectedUser=item;
    return this.httpclient.get(this.url).pipe(map((res: Response) => res));
  }
  EditUser(item: User): Observable<any> {
    console.log(item);
    return this.httpclient.put(this.url + "/" + item.UserID, item);
  }
}
