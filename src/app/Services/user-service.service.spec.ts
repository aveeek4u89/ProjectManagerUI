import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserServiceService } from './user-service.service';
import { User } from '../Model/user';

describe('UserServiceService', () => {
  const url = "http://localhost/ProjectManagerAPI/api/User/";
  const userObj = {
    UserID: 15,
    FirstName: 'Test',
    LastName: 'User1',
    EmployeeID: 25,
    ProjectID: 3,
    TaskID: 4
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));
  it('expects service to fetch data',
    inject([HttpTestingController, UserServiceService],
      (httpMock: HttpTestingController, service: UserServiceService) => {
        // We call the service
        service.GetAll().subscribe(data => {
          expect(data.pageInfo.totalRecordCount).toBeGreaterThan(0);
          expect(data.pageInfo.pageNumber).toBe(0);
          expect(data.data.length).toBeGreaterThan(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');

        req.flush({ data: User });

        httpMock.verify();
      })
  )

  it('expects service to post data',
    inject([HttpTestingController, UserServiceService],
      (httpMock: HttpTestingController, service: UserServiceService) => {
        // We call the service
        service.Add(userObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');

        req.flush({ data: User });

        httpMock.verify();
      })
  )

  it('expects service to put data',
    inject([HttpTestingController, UserServiceService],
      (httpMock: HttpTestingController, service: UserServiceService) => {

        // We call the service
        service.EditUser(userObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url + userObj.UserID);
        expect(req.request.method).toEqual('PUT');

        req.flush({ data: User });

        httpMock.verify();
      })
  )
  it('should be created', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
  });
});
