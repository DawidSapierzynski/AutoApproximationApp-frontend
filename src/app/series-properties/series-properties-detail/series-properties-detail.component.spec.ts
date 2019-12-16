import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPropertiesDetailComponent } from './series-properties-detail.component';

describe('SeriesPropertiesComponent', () => {
  let component: SeriesPropertiesDetailComponent;
  let fixture: ComponentFixture<SeriesPropertiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesPropertiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPropertiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
