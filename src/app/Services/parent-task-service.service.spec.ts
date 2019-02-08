import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParentTaskServiceService } from './parent-task-service.service';
import { ParentTask } from '../Model/parent-task';

describe('ParentTaskServiceService', () => {
  const pTaskConst = { ParentTaskID: 14, ParentTaskName: 'ParentTask1' };
  const url = "http://localhost/ProjectManagerAPI/api/ParentTask/";
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('expects service to fetch data',
    inject([HttpTestingController, ParentTaskServiceService],
      (httpMock: HttpTestingController, service: ParentTaskServiceService) => {
        // We call the service
        service.GetAll().subscribe(data => {
          expect(data.pageInfo.totalRecordCount).toBeGreaterThan(0);
          expect(data.pageInfo.pageNumber).toBe(0);
          expect(data.data.length).toBeGreaterThan(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');

        req.flush({ data: ParentTask });

        httpMock.verify();
      })
  )

  it('expects service to post data',
    inject([HttpTestingController, ParentTaskServiceService],
      (httpMock: HttpTestingController, service: ParentTaskServiceService) => {
        // We call the service
        service.Add(pTaskConst).subscribe(data => {
          expect(data.data.length).toBe(0);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');

        req.flush({ data: ParentTask });

        httpMock.verify();
      })
  )

  it('should be created', () => {
    const service: ParentTaskServiceService = TestBed.get(ParentTaskServiceService);
    expect(service).toBeTruthy();
  });
});
