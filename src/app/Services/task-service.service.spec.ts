import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskServiceService } from './task-service.service';
import { Task } from '../Model/task';

describe('TaskServiceService', () => {
  const url = "http://localhost/ProjectManagerAPI/api/task/";
  const taskObj = {
    TaskID: 10,
    ParentTaskID: 2,
    ParentTaskName: 'ParentTask1',
    ProjectID: 2,
    TaskName: 'Task Test',
    StartDate: new Date('2019-05-20'),
    EndDate: new Date('2019-05-22'),
    Priority: 23,
    ISActive: true,
    ProjectName: 'Project Test',
    UserID: 20,
    UserName: 'Test User'
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('expects service to fetch data',
    inject([HttpTestingController, TaskServiceService],
      (httpMock: HttpTestingController, service: TaskServiceService) => {
        // We call the service
        service.GetAll().subscribe(data => {
          expect(data.pageInfo.totalRecordCount).toBeGreaterThan(0);
          expect(data.pageInfo.pageNumber).toBe(0);
          expect(data.data.length).toBeGreaterThan(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');

        req.flush({ data: Task });

        httpMock.verify();
      })
  )

  it('expects service to post data',
    inject([HttpTestingController, TaskServiceService],
      (httpMock: HttpTestingController, service: TaskServiceService) => {
        // We call the service
        service.Add(taskObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');

        req.flush({ data: Task });

        httpMock.verify();
      })
  )

  it('expects service to put data',
    inject([HttpTestingController, TaskServiceService],
      (httpMock: HttpTestingController, service: TaskServiceService) => {

        // We call the service
        service.EditTask(taskObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url + taskObj.TaskID);
        expect(req.request.method).toEqual('PUT');

        req.flush({ data: Task });

        httpMock.verify();
      })
  )
  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  });
});
