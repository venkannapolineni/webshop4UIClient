import { TestBed } from '@angular/core/testing';

import { RestApiService } from '../shared/rest-api-service.service';

describe('RestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestApiService = TestBed.get(RestApiService);
    expect(service).toBeTruthy();
  });
});
