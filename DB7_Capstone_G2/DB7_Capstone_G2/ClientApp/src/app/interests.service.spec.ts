import { TestBed } from '@angular/core/testing';

import { InterestsService } from './interests.service';

describe('InterestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterestsService = TestBed.get(InterestsService);
    expect(service).toBeTruthy();
  });
});
