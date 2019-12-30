import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproximationPropertiesDetailComponent } from './approximation-properties-detail.component';

describe('ApproximationPropertiesComponent', () => {
  let component: ApproximationPropertiesDetailComponent;
  let fixture: ComponentFixture<ApproximationPropertiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproximationPropertiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproximationPropertiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
