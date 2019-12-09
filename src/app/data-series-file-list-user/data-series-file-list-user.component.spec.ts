import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSeriesFileListUserComponent } from './data-series-file-list-user.component';

describe('DataSeriesFileListUserComponent', () => {
  let component: DataSeriesFileListUserComponent;
  let fixture: ComponentFixture<DataSeriesFileListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSeriesFileListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSeriesFileListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
