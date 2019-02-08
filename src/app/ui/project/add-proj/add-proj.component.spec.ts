import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjComponent } from './add-proj.component';

describe('AddProjComponent', () => {
  let component: AddProjComponent;
  let fixture: ComponentFixture<AddProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
