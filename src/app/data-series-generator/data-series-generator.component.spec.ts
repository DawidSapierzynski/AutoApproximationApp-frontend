import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSeriesGeneratorComponent } from './data-series-generator.component';

describe('DataSeriesGeneratorComponent', () => {
  let component: DataSeriesGeneratorComponent;
  let fixture: ComponentFixture<DataSeriesGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSeriesGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSeriesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
