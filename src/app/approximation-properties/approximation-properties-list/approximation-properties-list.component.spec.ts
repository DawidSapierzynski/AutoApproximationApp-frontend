import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproximationPropertiesListUserComponent } from './approximation-properties-list.component';

describe('ApproximationPropertiesListUserComponent', () => {
  let component: ApproximationPropertiesListUserComponent;
  let fixture: ComponentFixture<ApproximationPropertiesListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproximationPropertiesListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproximationPropertiesListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
