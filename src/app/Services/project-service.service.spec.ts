import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectServiceService } from './project-service.service';
import { Project } from '../Model/project';

describe('ProjectServiceService', () => {
  const projectObj = {
    ProjectID: 20,
    ProjectName: 'ProjectTest',
    StartDate: new Date('2019-05-20'),
    EndDate: new Date('2019-05-22'),
    Priority: 15,
    ISActive: true,
    ManagerName: 'Test User',
    EmployeeID: 20,
    NoOfTasks: 10,
    CompletedTasks: 2
  }
  const projectPutObj = {
    ProjectID: 13,
    ProjectName: 'ProjectTest',
    StartDate: new Date('2019-05-20'),
    EndDate: new Date('2019-05-22'),
    Priority: 15,
    ISActive: true,
    ManagerName: 'Test User',
    EmployeeID: 20,
    NoOfTasks: 10,
    CompletedTasks: 2
  }
  const url = "http://localhost/ProjectManagerAPI/api/Project/";
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('expects service to fetch data',
    inject([HttpTestingController, ProjectServiceService],
      (httpMock: HttpTestingController, service: ProjectServiceService) => {
        // We call the service
        service.GetAll().subscribe(data => {
          expect(data.pageInfo.totalRecordCount).toBeGreaterThan(0); 
          expect(data.pageInfo.pageNumber).toBe(0);
          expect(data.data.length).toBeGreaterThan(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');

        req.flush({ data: Project });

        httpMock.verify();
      })
  )

  it('expects service to post data',
    inject([HttpTestingController, ProjectServiceService],
      (httpMock: HttpTestingController, service: ProjectServiceService) => {
        // We call the service
        service.Add(projectObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');

        req.flush({ data: Project });

        httpMock.verify();
      })
  )

  it('expects service to put data',
    inject([HttpTestingController, ProjectServiceService],
      (httpMock: HttpTestingController, service: ProjectServiceService) => {

        // We call the service
        service.EditProject(projectPutObj).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url + projectPutObj.ProjectID);
        expect(req.request.method).toEqual('PUT');

        req.flush({ data: Project });
        httpMock.verify(); 
      })
  )

  it('should be created', () => {
    const service: ProjectServiceService = TestBed.get(ProjectServiceService);
    expect(service).toBeTruthy();
  });
});
