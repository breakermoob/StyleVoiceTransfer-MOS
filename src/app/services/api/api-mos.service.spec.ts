import { TestBed } from '@angular/core/testing';

import { ApiMosService } from './api-mos.service';

describe('ApiMosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMosService = TestBed.get(ApiMosService);
    expect(service).toBeTruthy();
  });
});
