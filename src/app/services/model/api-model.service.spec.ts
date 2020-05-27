import { TestBed } from '@angular/core/testing';

import { ApiModelService } from './api-model.service';

describe('ApiModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiModelService = TestBed.get(ApiModelService);
    expect(service).toBeTruthy();
  });
});
