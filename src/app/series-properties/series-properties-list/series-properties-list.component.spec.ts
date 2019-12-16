import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPropertiesListUserComponent } from './series-properties-list.component';

describe('SeriesPropertiesListUserComponent', () => {
  let component: SeriesPropertiesListUserComponent;
  let fixture: ComponentFixture<SeriesPropertiesListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesPropertiesListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPropertiesListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
