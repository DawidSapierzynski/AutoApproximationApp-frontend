import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSeriesFileListComponent } from './data-series-file-list.component';

describe('DataSeriesFileListUserComponent', () => {
  let component: DataSeriesFileListComponent;
  let fixture: ComponentFixture<DataSeriesFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSeriesFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSeriesFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
