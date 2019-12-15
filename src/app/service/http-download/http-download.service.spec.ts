import { TestBed } from '@angular/core/testing';

import { HttpDownloadService } from './http-download.service';

describe('DownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDownloadService = TestBed.get(HttpDownloadService);
    expect(service).toBeTruthy();
  });
});
