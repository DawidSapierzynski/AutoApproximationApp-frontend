import { TestBed } from '@angular/core/testing';

import { HttpSeriesPropertiesService } from './http-series-properties.service';

describe('HttpSeriesPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpSeriesPropertiesService = TestBed.get(HttpSeriesPropertiesService);
    expect(service).toBeTruthy();
  });
});
