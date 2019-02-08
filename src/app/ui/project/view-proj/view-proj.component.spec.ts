import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjComponent } from './view-proj.component';

describe('ViewProjComponent', () => {
  let component: ViewProjComponent;
  let fixture: ComponentFixture<ViewProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
