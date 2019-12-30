import { TestBed } from '@angular/core/testing';

import { HttpApproximationPropertiesService } from './http-approximation-properties.service';

describe('HttpApproximationPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpApproximationPropertiesService = TestBed.get(HttpApproximationPropertiesService);
    expect(service).toBeTruthy();
  });
});
