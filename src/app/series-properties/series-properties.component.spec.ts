import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPropertiesComponent } from './series-properties.component';

describe('SeriesPropertiesComponent', () => {
  let component: SeriesPropertiesComponent;
  let fixture: ComponentFixture<SeriesPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
