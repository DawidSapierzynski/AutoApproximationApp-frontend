import { TestBed } from '@angular/core/testing';

import { HttpDataSeriesFileService } from './http-data-series-file.service';

describe('HttpDataSeriesFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDataSeriesFileService = TestBed.get(HttpDataSeriesFileService);
    expect(service).toBeTruthy();
  });
});
